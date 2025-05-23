import { libraryInsertion } from "./datainsertion.ts/librarian.insert";
import { borrowedItemInsertion } from "./datainsertion.ts/borrowedItem.insert";

// Run librarian data insertion
libraryInsertion();

// Run borrowed items data insertion
borrowedItemInsertion();