import { SearchBar } from "../search-bar";

export default function SearchBarExample() {
  return (
    <div className="p-4 max-w-xl">
      <SearchBar
        onSearch={(query) => console.log("Searching:", query)}
        className="pl-10"
      />
    </div>
  );
}
