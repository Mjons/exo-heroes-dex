import csv
import json
from collections import defaultdict

def count_traits_by_category(csv_file_path):
    # Dictionary to store counts for each trait category
    trait_counts = defaultdict(lambda: defaultdict(int))

    with open(csv_file_path, mode='r') as file:
        reader = csv.DictReader(file)

        for row in reader:
            # Iterate over each category in the row
            for category, trait in row.items():
                if category != 'ID' and trait:  # Skip the ID column and empty traits
                    trait_counts[category][trait] += 1

    return trait_counts

def save_trait_counts(trait_counts, output_json_path):
    with open(output_json_path, 'w') as file:
        json.dump(trait_counts, file, indent=4)
    print(f"Trait counts have been saved to {output_json_path}")

if __name__ == "__main__":
    csv_file_path = 'master.csv'  # The filtered CSV file with trait combinations
    output_json_path = 'trait_counts.json'  # Output JSON file to save the counts

    # Count the traits by category
    trait_counts = count_traits_by_category(csv_file_path)

    # Save the counts to a JSON file
    save_trait_counts(trait_counts, output_json_path)

    # Print the counts for verification
    for category, traits in trait_counts.items():
        print(f"\nCategory: {category}")
        for trait, count in traits.items():
            print(f"  {trait}: {count}")
