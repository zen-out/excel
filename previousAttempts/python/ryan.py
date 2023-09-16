import pandas as pd
import math
from datetime import datetime, timedelta


# -- get date
def get_upcoming_wednesday():
    today = datetime.today()
    return today + timedelta(
        days=(2 - today.weekday() + 7) % 7
    )  # 2 corresponds to Wednesday


#
def get_weight_per_sheet(description):
    import re

    weight = re.findall(r"[-+]?\d*\.\d+|\d+", description)
    if weight:
        return float(weight[-1])
    else:
        return None  # or some other default value


def allocate_material(hkor_row, bdor_df):
    column_name_mapping = {
        "料品號": "Item Number",
        "说明": "Item Description",
        "f": "f",
        "批次": "By air or ship",
        "數量": "Qty",
        "備註": "Remarks",
    }
    # getting the index
    hkor_row.index = [column_name_mapping.get(name, name) for name in hkor_row.index]
    # get same material number from hk
    same_material_number = bdor_df[
        bdor_df["Material number"] == hkor_row["Item Number"]
    ].copy()
    # if it's not the same, just return the row
    if same_material_number.empty:
        return pd.NA, hkor_row
    # get all the material numbers and you sort by date
    same_material_number = same_material_number[
        same_material_number["Material shortage after inventory allocation"] != 0
    ].sort_values("Date of issue")
    new_rows = pd.DataFrame()
    # create a variable called split, where you keep track of whether or not you split an item
    split_occurred = False
    total_air_ship_sheets = 0
    total_air_ship_qty = 0
    # create a variable where you keep track of whether or not it's air ship
    air_ship_flag = False  # Add this flag to track air shipment eligibility

    # Convert date fields to datetime format
    bdor_df["Date of issue"] = pd.to_datetime(bdor_df["Date of issue"])
    bdor_df["Assign maximum in transit date"] = pd.to_datetime(
        bdor_df["Assign maximum in transit date"]
    )
    # loop through each row
    for idx, bdor_row in same_material_number.iterrows():
        print(f"Date of issue: {bdor_row['Date of issue']}")
        print(
            f"Assign maximum in transit date: {bdor_row['Assign maximum in transit date']}"
        )
        # if it has a value, and the transit date > date of issue (if it's 35 + following wednesday),
        # then airship is true
        # Also set shortage_qty to owed quantity
        if (
            pd.notnull(bdor_row["Assign maximum in transit date"])
            and bdor_row["Assign maximum in transit date"] > bdor_row["Date of issue"]
        ):
            # if material shortage after inventory allocation is 0, // it means that it's sc?
            print("Condition met")
            air_ship_flag = True
            shortage_qty = bdor_row["Owed quantity"]
        else:
            print("Condition not met")
            shortage_qty = bdor_row["Material shortage after inventory allocation"]

        #
        if (
            shortage_qty != 0
            and abs((upcoming_wednesday - bdor_row["Date of issue"]).days) <= 35
        ):
            air_ship_flag = (
                True  # Set the flag to True if air shipment conditions are met
            )

            weight_per_sheet = get_weight_per_sheet(hkor_row["Item Description"])
            if weight_per_sheet is None:
                continue

            bdor_qty_sheets = shortage_qty / weight_per_sheet
            bdor_qty_sheets = math.ceil(bdor_qty_sheets)
            hkor_qty_sheets = hkor_row["Qty"] / weight_per_sheet

            if bdor_qty_sheets <= hkor_qty_sheets:
                hkor_row["Qty"] -= bdor_qty_sheets * weight_per_sheet
                total_air_ship_sheets += bdor_qty_sheets
                total_air_ship_qty += bdor_qty_sheets * weight_per_sheet
                split_occurred = True
                bdor_df.loc[idx, "Material shortage after inventory allocation"] = 0

            else:
                remaining_qty = hkor_row["Qty"]
                bdor_df.loc[
                    idx, "Material shortage after inventory allocation"
                ] -= remaining_qty
                hkor_row["Qty"] = 0
                total_air_ship_sheets += remaining_qty / weight_per_sheet
                total_air_ship_qty += remaining_qty
                split_occurred = True

            if hkor_row["Qty"] == 0:
                break

        else:
            hkor_row["By air or ship"] = "sea ship"

    if split_occurred:
        new_row = hkor_row.copy()
        new_row["Qty"] = total_air_ship_qty
        new_row["By air or ship"] = "air ship"
        new_row[
            "Remarks"
        ] = f"{total_air_ship_sheets} sheets air ship, the rest will be sea shipped"
        new_rows = pd.concat([new_rows, pd.DataFrame([new_row])])

        hkor_row[
            "Remarks"
        ] = f"{total_air_ship_sheets} sheets air ship, the rest will be sea shipped"
    else:  # This is where you add the modification
        if hkor_row["Qty"] > 0:
            if air_ship_flag:  # Check if air shipment conditions were met
                hkor_row[
                    "By air or ship"
                ] = "air ship"  # Assign 'air ship' if conditions were met
            else:
                hkor_row["By air or ship"] = "sea ship"  # Assign 'sea ship' otherwise

    return new_rows, hkor_row


def post_process(new_rows, original_row):
    for idx, row in new_rows.iterrows():
        if row["Qty"] == original_row["Qty"]:
            row["Remarks"] = ""
    return new_rows


def translate_remarks(remark):
    if pd.isna(remark):
        return remark
    else:
        translated = remark.replace("sheets air ship", "条空运")
        translated = translated.replace("the rest will be sea shipped", "其他船运")
        return translated


bdor = pd.read_csv("~/Downloads/bdor.csv", low_memory=False)
hkor = pd.read_csv("~/Downloads/hkor.csv", low_memory=False)

hkor.columns = hkor.columns.str.strip()
bdor.columns = bdor.columns.str.strip()

hkor["Qty"] = pd.to_numeric(hkor["Qty"], errors="coerce")
bdor["Material shortage after inventory allocation"] = pd.to_numeric(
    bdor["Material shortage after inventory allocation"], errors="coerce"
)

bdor["Material number"] = bdor["Material number"].str.strip().str.lower()
hkor["Item Number"] = hkor["Item Number"].str.strip().str.lower()

bdor = bdor[bdor["Material shortage after inventory allocation"] != 0]


bdor["Date of issue"] = pd.to_datetime(bdor["Date of issue"])
bdor["Assign maximum in transit date"] = pd.to_datetime(
    bdor["Assign maximum in transit date"], errors="coerce"
)


upcoming_wednesday = get_upcoming_wednesday()

new_rows_list = []
for idx, row in hkor.iterrows():
    new_rows, updated_row = allocate_material(row, bdor)
    new_rows = post_process(new_rows, row)  # Apply post-processing to the new rows
    hkor.loc[idx] = updated_row
    new_rows_list.append(new_rows)

# Append new rows to the original hkor DataFrame
hkor = pd.concat([hkor] + new_rows_list)

# Remove rows with 0 quantity or blank transportation method
hkor = hkor[hkor["Qty"] != 0]
hkor = hkor[hkor["By air or ship"].notna()]

# Here's where you'd apply the translation function
hkor["Remarks"] = hkor["Remarks"].apply(translate_remarks)

# Export the DataFrame to a new CSV file with 'utf_8_sig' encoding
hkor.to_csv("~/Downloads/hkor_final.csv", index=False, encoding="utf_8_sig")
