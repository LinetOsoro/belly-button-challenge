The interactive dashboard link: https://linetosoro.github.io/belly-button-challenge/


Build an interactive dashboard to explore the Belly Button Biodiversity dataset; which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

Use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

Create a bubble chart that displays each sample. Use otu_ids for the x values. Use sample_values for the y values. Use sample_values for the marker size. Use otu_ids for the marker colors. Use otu_labels for the text values.

Display the sample metadata, i.e., an individual's demographic information.

Display each key-value pair from the metadata JSON object somewhere on the page.

Update all the plots when a new sample is selected. Additionally, create any layout that you would like for your dashboard.

Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo.


Hints:

Use console.log inside of your JavaScript code to see what your data looks like at each step.

Refer to the Plotly.js documentation when building the plots.

