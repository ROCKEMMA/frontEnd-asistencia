function cargarCSS(direccion){
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = direccion;
    document.head.appendChild(linkElement);
}

export { cargarCSS }