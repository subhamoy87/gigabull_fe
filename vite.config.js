import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function pdfUploadPlugin() {
  return {
    name: 'pdf-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload-pdf', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { filename, fileData } = JSON.parse(body);
              if (!filename || !fileData) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing filename or fileData' }));
                return;
              }

              // Target location: src/assets/pdfs/<filename>
              const pdfDir = path.resolve(__dirname, 'src/assets/pdfs');
              if (!fs.existsSync(pdfDir)) {
                fs.mkdirSync(pdfDir, { recursive: true });
              }

              const targetPath = path.resolve(pdfDir, filename);
              const base64Data = fileData.replace(/^data:application\/pdf;base64,/, '');
              const buffer = Buffer.from(base64Data, 'base64');

              // Overwrite existing file in src/assets/pdfs/
              fs.writeFileSync(targetPath, buffer);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: `Successfully updated ${filename} in src/assets/pdfs` }));
            } catch (err) {
              console.error('Error writing PDF:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });

      // Securely Update Admin Password Hash on disk inside src/data/AdminConfig.js
      server.middlewares.use('/api/change-admin-password', (req, res, next) => {

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { newHash } = JSON.parse(body);
              if (!newHash) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing newHash' }));
                return;
              }

              const configPath = path.resolve(__dirname, 'src/data/AdminConfig.js');
              const configContent = `// Secure SHA-256 Encrypted Admin Password Configuration\nexport const ADMIN_CONFIG = {\n  // Pre-hashed SHA-256 encrypted value of the admin password\n  passwordHash: '${newHash}',\n};\n`;

              fs.writeFileSync(configPath, configContent, 'utf-8');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Successfully updated admin password hash in src/data/AdminConfig.js' }));
            } catch (err) {
              console.error('Error writing AdminConfig.js:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });


      server.middlewares.use('/api/upload-logo', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { fileData } = JSON.parse(body);
              if (!fileData) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing fileData' }));
                return;
              }

              const sharedDir = path.resolve(__dirname, 'src/assets/shared');
              if (!fs.existsSync(sharedDir)) {
                fs.mkdirSync(sharedDir, { recursive: true });
              }

              const targetPath = path.resolve(sharedDir, 'logoWithText.webp');
              const base64Data = fileData.replace(/^data:[^;]+;base64,/, '');
              const buffer = Buffer.from(base64Data, 'base64');

              fs.writeFileSync(targetPath, buffer);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Successfully updated logoWithText.webp in src/assets/shared' }));
            } catch (err) {
              console.error('Error writing logo file:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });

      // Helper function to resolve category folder name
      const getCategoryDirName = (category) => {
        const cat = (category || '').toLowerCase();
        if (cat.includes("men's") || cat.includes("mens") || cat.includes("men")) {
          return 'mens-products';
        } else if (cat.includes("women's") || cat.includes("womens") || cat.includes("women")) {
          return 'womens-products';
        } else if (cat.includes('accessories')) {
          return 'accessories-products';
        }
        return 'mens-products';
      };

      // Real-time Save Product Images to category folder on disk
      server.middlewares.use('/api/save-product-images', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { category, slug, model_no, color, images } = JSON.parse(body);
              if (!Array.isArray(images)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing images array' }));
                return;
              }

              const sanitizeForFileName = (str) =>
                (str || '')
                  .toString()
                  .trim()
                  .replace(/[/\\?%*:|"<>]/g, '-')
                  .replace(/\s+/g, '-');

              const prefixParts = [];
              if (model_no) prefixParts.push(sanitizeForFileName(model_no));
              if (color) prefixParts.push(sanitizeForFileName(color));

              const filePrefix = prefixParts.length > 0 ? prefixParts.join('-') : sanitizeForFileName(slug || 'product');

              const categoryDirName = getCategoryDirName(category);
              const targetDir = path.resolve(__dirname, 'src/assets/category', categoryDirName);

              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }

              const savedImages = images.map((imgStr, idx) => {
                if (typeof imgStr === 'string' && imgStr.startsWith('data:image/')) {
                  const match = imgStr.match(/^data:image\/([a-zA-Z0-9]+);base64,/);
                  let ext = match ? match[1].toLowerCase() : 'webp';
                  if (ext === 'jpeg') ext = 'jpg';

                  const fileName = `${filePrefix}-${idx + 1}.${ext}`;
                  const targetPath = path.resolve(targetDir, fileName);
                  const base64Data = imgStr.replace(/^data:image\/[a-zA-Z0-9]+;base64,/, '');
                  const buffer = Buffer.from(base64Data, 'base64');

                  fs.writeFileSync(targetPath, buffer);
                  return `/src/assets/category/${categoryDirName}/${fileName}`;
                }
                return imgStr;
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, savedImages }));
            } catch (err) {
              console.error('Error saving product images:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });

      // Real-time Delete Product Images from disk
      server.middlewares.use('/api/delete-product-images', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { category, slug, imagePaths } = JSON.parse(body);
              const categoryDirName = getCategoryDirName(category);
              const categoryBase = path.resolve(__dirname, 'src/assets/category');
              const targetDir = path.resolve(categoryBase, categoryDirName);

              let deletedCount = 0;

              const deleteSingleImage = (imgPath) => {
                if (typeof imgPath !== 'string' || imgPath.startsWith('data:')) return false;
                const fileName = path.basename(imgPath);
                const directPath = path.resolve(targetDir, fileName);
                if (fs.existsSync(directPath)) {
                  fs.unlinkSync(directPath);
                  return true;
                }

                const subdirs = ['mens-products', 'womens-products', 'accessories-products'];
                for (const subdir of subdirs) {
                  const dirPath = path.resolve(categoryBase, subdir);
                  if (fs.existsSync(dirPath)) {
                    const files = fs.readdirSync(dirPath);
                    for (const file of files) {
                      const ext = path.extname(file);
                      const baseName = path.basename(file, ext);
                      const varName = (baseName + ext.replace('.', '_'))
                        .replace(/[^a-zA-Z0-9_]/g, '_')
                        .replace(/^(\d)/, '_$1');

                      if (file === fileName || file === imgPath || varName === imgPath) {
                        const fileOnDisk = path.resolve(dirPath, file);
                        if (fs.existsSync(fileOnDisk)) {
                          fs.unlinkSync(fileOnDisk);
                          return true;
                        }
                      }
                    }
                  }
                }
                return false;
              };

              if (Array.isArray(imagePaths) && imagePaths.length > 0) {
                imagePaths.forEach((imgPath) => {
                  if (deleteSingleImage(imgPath)) {
                    deletedCount++;
                  }
                });
              }
              
              if (slug && fs.existsSync(targetDir)) {
                const files = fs.readdirSync(targetDir);
                files.forEach((file) => {
                  if (file.startsWith(`${slug}-`)) {
                    const fileOnDisk = path.resolve(targetDir, file);
                    if (fs.existsSync(fileOnDisk)) {
                      fs.unlinkSync(fileOnDisk);
                      deletedCount++;
                    }
                  }
                });
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, deletedCount, message: `Deleted ${deletedCount} image(s) from disk` }));
            } catch (err) {
              console.error('Error deleting product images:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });

      // Real-time Save Products Data to Products.js and category assets on disk
      server.middlewares.use('/api/save-products-data', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { productsData } = JSON.parse(body);
              if (!Array.isArray(productsData)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing or invalid productsData array' }));
                return;
              }

              const categoryBase = path.resolve(__dirname, 'src/assets/category');
              const subdirs = ['mens-products', 'womens-products', 'accessories-products'];

              const sanitizeForFileName = (str) =>
                (str || '')
                  .toString()
                  .trim()
                  .replace(/[/\\?%*:|"<>]/g, '-')
                  .replace(/\s+/g, '-');

              const getCategoryDirName = (category) => {
                const cat = (category || '').toLowerCase();
                if (cat.includes("men's") || cat.includes("mens") || cat.includes("men")) return 'mens-products';
                if (cat.includes("women's") || cat.includes("womens") || cat.includes("women")) return 'womens-products';
                if (cat.includes('accessories')) return 'accessories-products';
                return 'mens-products';
              };

              // First pass: Rename any existing image files on disk if product model_no or color changed
              const synchronizedProductsData = productsData.map((cat) => {
                const categoryDirName = getCategoryDirName(cat.category);
                const targetDir = path.resolve(categoryBase, categoryDirName);

                const updatedProducts = (cat.products || []).map((prod) => {
                  const modelNo = prod.details?.model_no || '';
                  const color = prod.details?.color || '';

                  const prefixParts = [];
                  if (modelNo) prefixParts.push(sanitizeForFileName(modelNo));
                  if (color) prefixParts.push(sanitizeForFileName(color));

                  const filePrefix = prefixParts.length > 0 ? prefixParts.join('-') : sanitizeForFileName(prod.slug || 'product');

                  const updatedImages = (prod.images || []).map((imgRef, idx) => {
                    if (typeof imgRef === 'string' && !imgRef.startsWith('data:')) {
                      let cleanRef = imgRef.split('?')[0].split('#')[0];
                      if (cleanRef.includes('/src/assets/category/')) {
                        cleanRef = '/src/assets/category/' + cleanRef.split('/src/assets/category/')[1];
                      }

                      if (
                        cleanRef.startsWith('/src/assets/category/') ||
                        ['.webp', '.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(path.extname(cleanRef).toLowerCase())
                      ) {
                        const decoded = decodeURIComponent(cleanRef);
                        const currentFileName = path.basename(decoded);

                        let foundPath = null;
                        const direct = path.resolve(targetDir, currentFileName);
                        if (fs.existsSync(direct)) {
                          foundPath = direct;
                        } else {
                          for (const sub of subdirs) {
                            const dir = path.resolve(categoryBase, sub);
                            if (fs.existsSync(dir)) {
                              const files = fs.readdirSync(dir);
                              const matchFile = files.find((f) => f === currentFileName || decoded.includes(f));
                              if (matchFile) {
                                foundPath = path.resolve(dir, matchFile);
                                break;
                              }
                            }
                          }
                        }

                        if (foundPath && fs.existsSync(foundPath)) {
                          const ext = path.extname(foundPath).toLowerCase();
                          const expectedFileName = `${filePrefix}-${idx + 1}${ext}`;
                          const targetFolder = path.dirname(foundPath);
                          const newPath = path.resolve(targetFolder, expectedFileName);

                          if (currentFileName !== expectedFileName || foundPath !== newPath) {
                            try {
                              if (fs.existsSync(newPath) && foundPath !== newPath) {
                                fs.unlinkSync(newPath);
                              }
                              fs.renameSync(foundPath, newPath);
                              console.log(`Renamed image on disk: ${currentFileName} -> ${expectedFileName}`);
                            } catch (err) {
                              console.warn('Could not rename image on edit:', err.message);
                            }
                          }
                          const relSubdir = path.basename(targetFolder);
                          return `/src/assets/category/${relSubdir}/${expectedFileName}`;
                        }
                      }
                    }
                    return imgRef;
                  });

                  return { ...prod, images: updatedImages };
                });

                return { ...cat, products: updatedProducts };
              });

              const assetImports = [];
              const assetExports = [];
              const imageVarMap = {};
              const usedVarNames = new Set([
                'CategoryMensCollectionImg',
                'CategoryWomensCollectionImg',
                'CategoryAccessoriesCollectionImg',
              ]);

              const getUniqueVarName = (baseName, ext) => {
                let rawVar = (baseName + ext.replace('.', '_'))
                  .replace(/[^a-zA-Z0-9_]/g, '_')
                  .replace(/^(\d)/, '_$1');
                
                let varName = rawVar;
                let counter = 1;
                while (usedVarNames.has(varName)) {
                  counter++;
                  varName = `${rawVar}_${counter}`;
                }
                usedVarNames.add(varName);
                return varName;
              };



              subdirs.forEach((subdir) => {
                const dirPath = path.resolve(categoryBase, subdir);
                if (fs.existsSync(dirPath)) {
                  const files = fs.readdirSync(dirPath);
                  files.forEach((file) => {
                    const ext = path.extname(file);
                    if (['.webp', '.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(ext.toLowerCase())) {
                      const baseName = path.basename(file, ext);
                      const varName = getUniqueVarName(baseName, ext);

                      const relativePath = `./${subdir}/${file}`;
                      const webPath = `/src/assets/category/${subdir}/${file}`;

                      assetImports.push(`import ${varName} from '${relativePath}';`);
                      assetExports.push(`  ${varName},`);

                      imageVarMap[webPath] = varName;
                      imageVarMap[relativePath] = varName;
                      imageVarMap[file] = varName;
                    }
                  });
                }
              });

              const explicitMap = {
                'Category-Men_s-Collection.webp': 'CategoryMensCollectionImg',
                'Category-Women_s-Collection.webp': 'CategoryWomensCollectionImg',
                'Category-women_s-Collection.webp': 'CategoryWomensCollectionImg',
                'Category-Accessories-Collection.webp': 'CategoryAccessoriesCollectionImg',
                'uncategory-img1.webp': 'UnCategoryImg1',
                'uncategory-img2.webp': 'UnCategoryImg2',
              };

              if (fs.existsSync(categoryBase)) {
                const rootFiles = fs.readdirSync(categoryBase);
                rootFiles.forEach((file) => {
                  const filePath = path.join(categoryBase, file);
                  if (fs.statSync(filePath).isFile()) {
                    const ext = path.extname(file);
                    if (['.webp', '.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) {
                      const baseName = path.basename(file, ext);
                      const relativePath = `./${file}`;
                      const webPath = `/src/assets/category/${file}`;

                      if (!imageVarMap[webPath]) {
                        const varName = explicitMap[file] || getUniqueVarName(baseName, ext);
                        assetImports.push(`import ${varName} from '${relativePath}';`);
                        assetExports.push(`  ${varName},`);
                        imageVarMap[webPath] = varName;
                        imageVarMap[relativePath] = varName;
                        imageVarMap[file] = varName;
                      }
                    }
                  }
                });
              }

              const categoryIndexContent = `${assetImports.join('\n')}\n\nexport {\n${assetExports.join('\n')}\n};\n`;
              fs.writeFileSync(path.resolve(categoryBase, 'index.js'), categoryIndexContent, 'utf-8');

              const allUsedVars = new Set();
              const processedProductsData = synchronizedProductsData.map((cat) => ({
                ...cat,
                products: (cat.products || []).map((prod) => {
                  const images = (prod.images || []).map((img) => {
                    if (typeof img === 'string') {
                      let cleanImg = img.split('?')[0].split('#')[0];
                      if (cleanImg.includes('/src/assets/category/')) {
                        cleanImg = '/src/assets/category/' + cleanImg.split('/src/assets/category/')[1];
                      }
                      const fileName = path.basename(decodeURIComponent(cleanImg));

                      if (imageVarMap[cleanImg]) {
                        allUsedVars.add(imageVarMap[cleanImg]);
                        return `__VAR__:${imageVarMap[cleanImg]}`;
                      } else if (imageVarMap[img]) {
                        allUsedVars.add(imageVarMap[img]);
                        return `__VAR__:${imageVarMap[img]}`;
                      } else if (imageVarMap[fileName]) {
                        allUsedVars.add(imageVarMap[fileName]);
                        return `__VAR__:${imageVarMap[fileName]}`;
                      }
                    }
                    return img;
                  });
                  return { ...prod, images };
                }),
              }));

              const importsFromCategory = Array.from(allUsedVars).sort().map((v) => `  ${v},`).join('\n');
              const jsonString = JSON.stringify(processedProductsData, null, 2);
              const jsDataString = jsonString.replace(/"__VAR__:([a-zA-Z0-9_]+)"/g, '$1');

              const productsJsContent = `import {\n${importsFromCategory}\n} from '../assets/category';\n\nconst productsData = ${jsDataString};\n\nexport default productsData;\n`;
              
              fs.writeFileSync(path.resolve(__dirname, 'src/data/Products.js'), productsJsContent, 'utf-8');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Successfully updated Products.js and category assets on disk' }));
            } catch (err) {
              console.error('Error saving products data:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwind(), pdfUploadPlugin()],
  build: {
    target: 'esnext',
  },
});
