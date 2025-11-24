module.exports = function(eleventyConfig) {
  // Copia tutto ciò che c'è in src/styles/ e src/img/
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("src/img");

  // Collezione posts ordinata per data
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/**/*.md")
      .map(post => {
        // Se manca la data, assegna oggi
        if (!post.date) {
          post.date = new Date();
        } else {
          // Assicura che sia un oggetto Date
          post.date = new Date(post.date);
        }
        return post;
      })
      .sort((a, b) => b.date - a.date); // ordina decrescente
  });

  eleventyConfig.addFilter("dateToISO", (dateObj) => {
        // toISOString() restituisce una stringa in formato ISO 8601 (es. 2025-11-24T00:00:00.000Z)
        return dateObj.toISOString();
    });

    // 2. Filtro per formato Leggibile (Necessario per la visualizzazione all'utente)
    eleventyConfig.addFilter("readableDate", (dateObj) => {
        // Imposta le opzioni di formattazione
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        // Imposta la locale desiderata (ad esempio, 'it-IT' per l'italiano)
        return dateObj.toLocaleDateString('it-IT', options);
    });

  return {
    dir: {
      input: "src",          // cartella dei Markdown
      includes: "_includes", // layout
      output: "_site"        // cartella generata
    }
  };
};
