
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copia tutto ciò che c'è in src/styles/ e src/img/
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("src/img");
  
  eleventyConfig.addCollection("posts", function(collectionApi) {
  return collectionApi.getFilteredByGlob("src/posts/**/*.md").map(post => {
    if (!post.date) {
      post.date = new Date(); // assegna la data odierna
    }
    return post;
  }).sort((a, b) => b.date - a.date);
});

  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
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
