const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copia tutto ciò che c'è in src/styles/ e src/img/
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("src/img");

  // Collezione posts ordinata per data
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/**/*.md").map(post => {
      // Se manca la data, assegna oggi
      if (!post.date) {
        post.date = DateTime.now();
      } else {
        // Converte qualsiasi stringa o oggetto Date in DateTime valido
        post.date = DateTime.fromJSDate(new Date(post.date));
      }
      return post;
    }).sort((a, b) => b.date.toMillis() - a.date.toMillis()); // ordina decrescente
  });

  // Filtro per visualizzare la data in formato leggibile
  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    // Se è già un DateTime di Luxon
    if (DateTime.isDateTime(dateObj)) {
      return dateObj.toFormat("dd LLL yyyy");
    }
    // Se è un oggetto Date normale
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  return {
    dir: {
      input: "src",          // cartella dei Markdown
      includes: "_includes", // layout
      output: "_site"        // cartella generata
    }
  };
};
