const SearchBar = ({ value, onChange, onSubmit}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };
    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search Recipes"
                value={value}
                onChange={onChange}
                />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;