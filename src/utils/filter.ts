import store, { updateFilteredItemsMutation } from "@/store";
import MarketplaceItemModel from "@/models/marketplaceItemModel";
import { resetPaging } from "./pager";

export default function performItemsFiltering() {
  const allItems: Array<MarketplaceItemModel> = store.state.data.allItems;
  const searchPhrase = store.state.filter.searchPhrase;
  const selectedCategories = store.state.filter.selectedCategories;

  const searchFilteredItems = applySearchFilter(allItems, searchPhrase);
  const categoryFilteredItems = applyCategoriesFilter(
    searchFilteredItems,
    selectedCategories
  );

  store.commit(updateFilteredItemsMutation, categoryFilteredItems);
  resetPaging();
}

function applySearchFilter(
  itemsToFilter: Array<MarketplaceItemModel>,
  searchPhrase: string
): Array<MarketplaceItemModel> {
  if (searchPhrase === "") {
    return itemsToFilter;
  } else {
    const lowerCasedSearchPhrase = searchPhrase.toLocaleLowerCase();
    const filteredItems = itemsToFilter.filter(
      item =>
        item.name.toLocaleLowerCase().includes(lowerCasedSearchPhrase) ||
        item.description.toLocaleLowerCase().includes(lowerCasedSearchPhrase) ||
        item.author.toLocaleLowerCase().includes(lowerCasedSearchPhrase)
    );
    return filteredItems;
  }
}

function applyCategoriesFilter(
  itemsToFilter: Array<MarketplaceItemModel>,
  selectedCategories: Array<string>
): Array<MarketplaceItemModel> {
  if (selectedCategories.length === 0) {
    return itemsToFilter;
  } else {
    return itemsToFilter.filter(
      item => selectedCategories.indexOf(item.category) !== -1
    );
  }
}