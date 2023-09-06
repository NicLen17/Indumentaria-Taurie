import './SearchBar.css'

function SearchaBar({ busqueda, handleBusqueda, onSearch, limpiar }) {
  return (
    <div data-aos="fade-down" data-aos-once="true" data-aos-duration="800" data-aos-delay="100" className='Search-container'>
      <form className='SearchBar' onSubmit={(e) => onSearch(busqueda, e)}>
        <input placeholder='Nombre, marca, material...' value={busqueda} type="text" onChange={handleBusqueda} />
        <button onSubmit={(e) => onSearch(busqueda, e)}> <img width={32} src="https://icongr.am/clarity/search.svg?size=128&color=000000" alt="Icono de busqueda de imagen" /></button>
      </form>
      <button style={{border: "1px solid var(--decoraciones)", borderRadius: "50px", width: "50px", height: "50px"}} onClick={() => limpiar()}><img width={32} src="https://icongr.am/clarity/window-close.svg?size=128&color=000000" alt="Icono de busqueda de imagen" /></button>
    </div>
  )
}

export default SearchaBar