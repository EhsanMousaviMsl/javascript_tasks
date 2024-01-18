# External Sort in JavaScript
This JavaScript program performs an external sort on a large file with limited memory, specifically designed for machines with 500MB of RAM available.
## Usage
### Prerequisites
- Node.js installed on your machine
### Installation
1. Clone this repository to your local machine.
2. Navigate to the repository directory.

### Run the External Sort
Execute the following command in your terminal:

```bash
node externalSort.js
```
Make sure to adjust the inputFilePath, outputFilePath, and chunkSize variables in the script according to your requirements.

## Explanation
This program utilizes an external sorting algorithm to efficiently handle large datasets that cannot fit into the available memory. Here's a breakdown of its components:
1. **externalSort Function**      
    - **Parameters:**
        - `inputFilePath`: Path to the input file to be sorted.
        - `outputFilePath`: Path to the output file where the sorted data will be saved.
        - `chunkSize`:The size of each chunk to be processed in memory.
    - **Steps:**
        - Read the input file line by line and create sorted chunks based on the specified `chunkSize`.
        - Sort and write the last chunk.
        - Merge sorted chunks using a min-heap data structure.
        - Write the final sorted data to the output file.
2. **mergeChunks Function**
    - **Parameters:**
        - `chunks`: An array of sorted chunks.
        
    - **Steps:**
        - Initialize a min-heap.
        - Initialize the heap with the first element from each chunk.
        - Continue merging until all chunks are empty.

3. **MinHeap Class**
    - A class representing a binary min-heap.
    - It has methods for inserting elements, extracting the minimum element, and maintaining the heap property.

4. **Example Usage**
    - At the end of the script, an example usage demonstrates how to perform an external sort with specified file paths and chunk size.






