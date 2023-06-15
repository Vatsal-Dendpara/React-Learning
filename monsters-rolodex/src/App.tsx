import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";
import { getData } from "./utils/data.util";

export type Monsters = {
  id: string;
  name: string;
  email: string;
};

function App() {
  //state initialization
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState<Monsters[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  // for getting the data from the API
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monsters[]>(
        "https://jsonplaceholder.typicode.com/users"
      );

      setMonsters(users);
    };
    fetchUsers();
  }, []);

  //for filter the data based on the search parameters
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    //set the state of filter data.
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  //to set the state of the search field
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

export default App;
