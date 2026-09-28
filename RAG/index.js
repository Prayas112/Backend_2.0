import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import fs from "fs"
import "dotenv/config"
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({apiKey: process.env.PINECONE_API_KEY})
const index = pc.index("rag-index")


// read pdf
// let dataBuffer = fs.readFileSync("./story.pdf")
// const parser = new PDFParse({
//     data: dataBuffer
// })
// const data = await parser.getText()
// console.log(data)


const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})




// divide

// const spliter = new RecursiveCharacterTextSplitter({
//     chunkSize:500,
//     chunkOverlap: 0
// })

// const chunks = await spliter.splitText(data.text)

// const docs = await Promise.all(chunks.map(async (chunk)=>{
//     const embdding = await embeddings.embedQuery(chunk)
//     return{
//         text: chunk,
//         embdding
//     }
// }))

// const result = await index.upsert({
//     records: docs.map((doc, i)=>({
//         id: `doc-${i}`,
//         values: doc.embdding,
//         metadata: {
//             text: doc.text
//         }

//     }))
// })

const queryEmbedding = await embeddings.embedQuery("how was the internship")
console.log(queryEmbedding);

const result = await index.query({
    vector: queryEmbedding,
    topK:2,
    includeMetadata:true
})

console.log(JSON.stringify(result));







