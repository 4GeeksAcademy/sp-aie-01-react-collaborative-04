Genera una función usando UseContext para agregar a un nuevo componente Favorites, los elementos de /apis que marquemos con un corazon en un array vacío

- genera un corazon en las carts de las 4 paginas de /apis donde, si se preciona, ejecute una función addFavorite(), y rellene el corazon de rojo, y agruegue al array vacio de favorites . Si el corazon está rojo, al clicar, ejecute una función removeFavorite() que quite el objeto del array

- genera un Componente Favorites, que sea un botón desplegable, donde se visualicen los elementos seleccionados como favoritos. Debe estár seccinado en 4 indices: Ecomerce, Jugadores NBA, comida, Películas

- Dentro del desplegable con el array, agrega en el lado derecho del objeto, un botón de basura(trash) para eliminar el objeto del array usando removeFavorite()

- Los favoritos se mostrarán de forma dinámica según la ruta en la que se encuentre el usuario. Si el usuario está dentro de una sección asociada a una API concreta, los favoritos se filtrarán para mostrar únicamente los elementos de esa categoría (por ejemplo, jugadores de la NBA si está en la ruta de NBA). En caso de que el usuario no se encuentre en ninguna de estas rutas específicas, se mostrarán todos los favoritos sin aplicar ningún filtro.