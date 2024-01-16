const fs = require('fs');
const readline = require('readline');

async function externalSort(inputFilePath, outputFilePath, chunkSize) {
  // Read the input file line by line and create sorted chunks
  const chunks = [];
  const rl = readline.createInterface({
    input: fs.createReadStream(inputFilePath),
    crlfDelay: Infinity,
  });

  let currentChunk = [];
  for await (const line of rl) {
    currentChunk.push(line);
    if (currentChunk.length >= chunkSize) {
      currentChunk.sort();
      chunks.push(currentChunk);
      currentChunk = [];
    }
  }

  // Sort and write the last chunk
  currentChunk.sort();
  chunks.push(currentChunk);

  // Merge sorted chunks
  const mergedData = mergeChunks(chunks);

  // Write the final sorted data to the output file
  fs.writeFileSync(outputFilePath, mergedData.join('\n'));
}

function mergeChunks(chunks) {
  console.log('Merging chunks:', chunks);
  const mergedData = [];
  const heap = new MinHeap();

  // Initialize the heap with the first element from each chunk
  chunks.forEach((chunk, index) => {
    if (chunk.length > 0) {
      heap.insert({ value: chunk.shift(), chunkIndex: index });
    }
  });

  // Continue merging until all chunks are empty
  while (!heap.isEmpty()) {
    const { value, chunkIndex } = heap.extractMin();
    mergedData.push(value);

    // If the current chunk is not empty, insert the next element
    if (chunks[chunkIndex].length > 0) {
      heap.insert({ value: chunks[chunkIndex].shift(), chunkIndex });
    }
  }

  return mergedData;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(element) {
    this.heap.push(element);
    this.bubbleUp();
  }

  extractMin() {
    if (this.isEmpty()) {
      return null;
    }

    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown();
    }

    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  bubbleUp() {
    let currentIdx = this.heap.length - 1;

    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      if (this.heap[parentIdx].value > this.heap[currentIdx].value) {
        [this.heap[parentIdx], this.heap[currentIdx]] = [this.heap[currentIdx], this.heap[parentIdx]];
        currentIdx = parentIdx;
      } else {
        break;
      }
    }
  }

  bubbleDown() {
    let currentIdx = 0;

    while (true) {
      const leftChildIdx = 2 * currentIdx + 1;
      const rightChildIdx = 2 * currentIdx + 2;
      let smallestChildIdx = currentIdx;

      if (leftChildIdx < this.heap.length && this.heap[leftChildIdx].value < this.heap[smallestChildIdx].value) {
        smallestChildIdx = leftChildIdx;
      }

      if (rightChildIdx < this.heap.length && this.heap[rightChildIdx].value < this.heap[smallestChildIdx].value) {
        smallestChildIdx = rightChildIdx;
      }

      if (smallestChildIdx !== currentIdx) {
        [this.heap[currentIdx], this.heap[smallestChildIdx]] = [this.heap[smallestChildIdx], this.heap[currentIdx]];
        currentIdx = smallestChildIdx;
      } else {
        break;
      }
    }
  }
}

// Example usage
const inputFilePath = 'input.txt';
const outputFilePath = 'output.txt';
const chunkSize = 1000; // Adjust this value based on your available memory

externalSort(inputFilePath, outputFilePath, chunkSize);
