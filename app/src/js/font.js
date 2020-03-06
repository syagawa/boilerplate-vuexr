import fontawesome from '@fortawesome/fontawesome';

// load bulk
// import faSolid from "@fortawesome/fontawesome-free-solid";
// import faRegular from "@fortawesome/fontawesome-free-regular";

// load one by one
import fasAddressBook from "@fortawesome/fontawesome-free-solid/faAddressBook";

const FontAwesomeConfig = { searchPseudoElements: true };

fontawesome.library.add(
  // faSolid,
  // faRegular
  fasAddressBook
);