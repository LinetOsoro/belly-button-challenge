// Assign variable to the URL
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Function to fetch JSON data and initialize the dashboard
function init() {
    console.log("Fetching JSON data...");
    d3.json(url).then(function(data) {
        console.log("JSON data fetched successfully.");
        console.log("Data:", data);

        // Get sample IDs
        const sampleIds = data.names;
        console.log("Sample IDs:", sampleIds);

        // Populate dropdown menu
        const dropdown = d3.select("#selDataset");
        dropdown.selectAll("option")
            .data(sampleIds)
            .enter()
            .append("option")
            .attr("value", d => d)
            .text(d => d);
        
        // Initial update of charts with the first sample
        console.log("Updating charts with the first sample:", sampleIds[0]);
        let firstId = sampleIds[0];
        optionChanged(firstId);
    });
}

// Function to update bubble and bar charts with selected sample data
function updateCharts(sampleId, jsData) {
    console.log("Updating charts for sample:", sampleId);
    
    // Find selected sample data from the fetched JSON data
    const selectedSample = jsData.samples.find(sample => sample.id == sampleId);
    console.log("Selected sample:", selectedSample);

    // Update bar chart
    var traceBar = {
        x: selectedSample.sample_values.slice(0, 10).reverse(),
        y: selectedSample.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        text: selectedSample.otu_labels.slice(0, 10).reverse(),
        name: "Greek",
        type: "bar",
        orientation: "h"
    };
    var dataBar = [traceBar];
    var layoutBar = {
        title: "Top Ten OTUs for Individual " + sampleId,
    };
    console.log("Updating bar chart with data:", dataBar);
    Plotly.newPlot("bar", dataBar, layoutBar);

    // Update bubble chart
    var traceBubble = {
        x: selectedSample.otu_ids,
        y: selectedSample.sample_values,
        text: selectedSample.otu_labels,
        mode: 'markers',
        marker: {
            size: selectedSample.sample_values,
            color: selectedSample.otu_ids,
            colorscale: 'inferno'
        }
    };
    var dataBubble = [traceBubble];
    var layoutBubble = {
        showlegend: false,
        hovermode: 'closest',
    };
    console.log("Updating bubble chart with data:", dataBubble);
    Plotly.newPlot('bubble', dataBubble, layoutBubble);
}

// Display the sample metadata i.e., an individual's demographic information
function displayMetadata(sampleId, jsData) {
    // Find selected sample metadata from the fetched JSON data
    const selectedMetadata = jsData.metadata.find(metadata => metadata.id == sampleId);
    // Log metadata to the console
    console.log("Sample Metadata for sample ID:", sampleId);
    console.log(selectedMetadata);

    // Select the element to display the metadata
    const metadataElement = d3.select("#sample-metadata");

    // Clear previous metadata
    metadataElement.html("");

    // Display each key-value pair from the metadata JSON object somewhere on the page
    const specificKeys = ['id', 'ethnicity', 'gender', 'age', 'location', 'bbtype', 'wfreq'];

    console.log("Displaying specific key-value pairs from metadata:");

    specificKeys.forEach(key => {
        if (selectedMetadata.hasOwnProperty(key)) {
            const value = selectedMetadata[key];
            console.log(`Key: ${key}, Value: ${value}`);
            
            // Create a <p> element for each key-value pair and append it to the metadata element
            metadataElement.append("p")
                .text(`${key}: ${value}`);
        } else {
            console.log(`Key '${key}' not found in metadata.`);
        }
    });
}

// Function to update all plots and display metadata for the selected sample
function optionChanged(sampleId) {
    d3.json(url).then(function(data) {
        // Update charts with the selected sample
        updateCharts(sampleId, data);
        // Display metadata for the selected sample
        displayMetadata(sampleId, data);
    });
}

// Call init function to start the dashboard
init();