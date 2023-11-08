// This function filters out duplicate locations based on geo coordinate from search history
export default function uniqueHistory(searchHistory) {
  // Filter the searchHistory array using the filter method
  const uniqueHistory = searchHistory.filter(
    // For each item in the searchHistory array, check if the index of the first occurrence of the item in the array is equal to the current index
    // This ensures that only the first occurrence of an item with a specific geo coordinate is kept in the array
    (item, index, self) => index === self.findIndex((t) => t.coord.lon === item.coord.lon && t.coord.lat === item.coord.lat)
  );
  // Return the filtered array
  return uniqueHistory;
}
