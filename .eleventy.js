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

  return {
    dir: {
      input: "src",          // cartella dei Markdown
      includes: "_includes", // layout
      output: "_site"        // cartella generata
    }
  };
};
