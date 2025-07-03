const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const contentPath = path.join(process.cwd(), "content");

function validateContent() {
  const errors = [];
  
  ["blog", "projects"].forEach(contentType => {
    const dir = path.join(contentPath, contentType);
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx"));
    
    files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(dir, file), "utf8");
        const { data } = matter(content);
        
        // Check required fields
        const required = ["title", "publishedAt", "summary"];
        required.forEach(field => {
          if (!data[field]) {
            errors.push(`${file}: Missing required field '${field}'`);
          }
        });
        
        // Validate date format
        if (data.publishedAt && isNaN(Date.parse(data.publishedAt))) {
          errors.push(`${file}: Invalid date format for 'publishedAt'`);
        }

        // Project-specific validations
        if (contentType === "projects") {
          if (!data.status) {
            errors.push(`${file}: Missing required field 'status' for project`);
          }
          if (!Array.isArray(data.tags)) {
            errors.push(`${file}: 'tags' must be an array for project`);
          }
        }
      } catch (error) {
        errors.push(`${file}: ${error.message}`);
      }
    });
  });
  
  if (errors.length > 0) {
    console.error("Content validation failed:");
    errors.forEach(error => console.error(`  - ${error}`));
    process.exit(1);
  } else {
    console.log("✅ All content validated successfully!");
  }
}

validateContent();
