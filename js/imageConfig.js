/**
 * Image Configuration for Nuno Sousa Portfolio
 * 
 * This file centralizes all image paths and alt text for the portfolio.
 * 
 * To add a new project:
 * 1. Create a new folder in images/projects/ with project name (lowercase-with-hyphens)
 * 2. Add project configuration in the 'projects' section below
 * 3. Use the template at the bottom of this file as a guide
 * 
 * Image naming conventions:
 * - main-image.jpg (or .webp/.png) for the featured image
 * - gallery-1.jpg, gallery-2.jpg, etc. for additional images
 * - video.mp4 for video content (optional)
 */

const ImageConfig = {
    slideshow: {
        image1: {
            src: 'images/slideshow/1.jpg',
            alt: 'Nuno Sousa Artwork 1'
        },
        image2: {
            src: 'images/slideshow/2.jpg',
            alt: 'Nuno Sousa Artwork 2'
        },
        image3: {
            src: 'images/slideshow/3.jpg',
            alt: 'Nuno Sousa Artwork 3'
        }
    },
    
    profile: {
        main: {
            src: 'images/profile/1.jpeg',
            alt: 'Nuno Sousa - 3D Artist'
        }
    },
    
    products: {
        vertexGroupToSculptMask: {
            src: 'images/products/Product-1.jpg',
            alt: 'Vertex Group to Sculpt Mask'
        },
        voxelMaster: {
            src: 'images/products/Product-2.jpg',
            alt: 'Voxel Master'
        },
        product3: {
            src: 'images/products/Product-3.jpg',
            alt: 'Product 3'
        }
    },
    
    projects: {
        digitalDebris: {
            main: {
                src: 'images/projects/digital-debris/your-image-name.jpg',
                alt: 'Digital Debris - Main Image'
            },
            gallery: [
                {
                    src: 'images/projects/digital-debris/placeholder-image-1.jpg',
                    alt: 'Digital Debris - Process Image 1'
                },
                {
                    src: 'images/projects/digital-debris/placeholder-image-2.jpg',
                    alt: 'Digital Debris - Process Image 2'
                },
                {
                    src: 'images/projects/digital-debris/placeholder-image-3.webp',
                    alt: 'Digital Debris - Detail View'
                },
                {
                    src: 'images/projects/digital-debris/placeholder-image-4.webp',
                    alt: 'Digital Debris - Installation View'
                },
                {
                    src: 'images/projects/digital-debris/placeholder-image-5.webp',
                    alt: 'Digital Debris - Close-up Detail'
                }
            ],
            video: {
                src: 'images/1.mp4',
                alt: 'Digital Debris - Process Video'
            }
        },
        
        comingSoon: {
            placeholder: {
                src: 'images/projects/digital-debris/placeholder-image-1.jpg',
                alt: 'Coming Soon'
            }
        },
        
        limbo: {
            main: {
                src: 'images/projects/limbo/main-image.jpg',
                alt: 'Limbo - Main Image'
            },
            gallery: [
                {
                    src: 'images/projects/limbo/DSC01828.jpg',
                    alt: 'Limbo - Gallery Image 1'
                },
                {
                    src: 'images/projects/limbo/your-image-name.jpg',
                    alt: 'Limbo - Gallery Image 2'
                }
            ]
        },
        
        oCaco: {
            main: {
                src: 'images/projects/o-caco/your-image-name.jpg',
                alt: 'O Caco - Main Image'
            }
        },
        
        sediments: {
            main: {
                src: 'images/projects/sediments/your-image-name.jpg',
                alt: 'Sediments - Main Image'
            }
        },
        
        artwork: {
            main: {
                src: 'images/projects/artwork-main.webp',
                alt: 'Artwork - Main'
            },
            variant1: {
                src: 'images/projects/artwork-variant-1.webp',
                alt: 'Artwork - Variant 1'
            },
            details: [
                {
                    src: 'images/projects/artwork-detail-1.webp',
                    alt: 'Artwork - Detail 1'
                },
                {
                    src: 'images/projects/artwork-detail-2.webp',
                    alt: 'Artwork - Detail 2'
                },
                {
                    src: 'images/projects/artwork-detail-3.webp',
                    alt: 'Artwork - Detail 3'
                }
            ]
        },
        
        procedural: {
            texture: {
                src: 'images/projects/procedural-texture.png',
                alt: 'Procedural Texture'
            },
            aiGenerated: {
                src: 'images/projects/ai-generated-artwork.png',
                alt: 'AI Generated Artwork'
            }
        },
        
        misc: {
            ignorance: {
                src: 'images/projects/Ignorance.webp',
                alt: 'Ignorance'
            },
            telephone: {
                src: 'images/projects/Ceci n\'est pas un Telephone (3_4 sedimentss).webp',
                alt: 'Ceci n\'est pas un Telephone'
            },
            chatgptImage: {
                src: 'images/projects/ChatGPT Image Apr 21, 2025, 01_39_21 PM.webp',
                alt: 'ChatGPT Generated Image'
            },
            geminiImage: {
                src: 'images/projects/Gemini_Generated_Image_uvusrtuvusrtuvus.jpg',
                alt: 'Gemini Generated Image'
            },
            whatsappImage: {
                src: 'images/projects/WhatsApp Image 2022-08-24 at 23.34.15.jpeg',
                alt: 'WhatsApp Image'
            },
            image3: {
                src: 'images/projects/image (3).webp',
                alt: 'Project Image 3'
            },
            image4: {
                src: 'images/projects/image (4).webp',
                alt: 'Project Image 4'
            }
        },
        
        // ===== TEMPLATE FOR NEW PROJECTS =====
        // Copy and modify this template for each new project:
        /*
        newProjectName: {
            main: {
                src: 'images/projects/project-folder-name/main-image.jpg',
                alt: 'Project Title - Main Image'
            },
            gallery: [
                {
                    src: 'images/projects/project-folder-name/gallery-1.jpg',
                    alt: 'Project Title - Gallery Image 1'
                },
                {
                    src: 'images/projects/project-folder-name/gallery-2.jpg',
                    alt: 'Project Title - Gallery Image 2'
                },
                {
                    src: 'images/projects/project-folder-name/gallery-3.jpg',
                    alt: 'Project Title - Gallery Image 3'
                }
                // Add more gallery images as needed
            ],
            // Optional: Add video if project has video content
            video: {
                src: 'images/projects/project-folder-name/video.mp4',
                alt: 'Project Title - Process Video'
            }
        },
        */
    }
};

window.ImageConfig = ImageConfig;

function getImage(path) {
    const keys = path.split('.');
    let current = ImageConfig;
    
    for (const key of keys) {
        if (current[key]) {
            current = current[key];
        } else {
            console.warn(`Image path not found: ${path}`);
            return null;
        }
    }
    
    return current;
}

function setImageSource(selector, imagePath, basePath = '') {
    const element = document.querySelector(selector);
    const imageData = getImage(imagePath);
    
    if (element && imageData) {
        element.src = basePath + imageData.src;
        element.alt = imageData.alt;
    }
}

function setImageSources(mappings, basePath = '') {
    mappings.forEach(mapping => {
        setImageSource(mapping.selector, mapping.path, basePath);
    });
}

window.getImage = getImage;
window.setImageSource = setImageSource;
window.setImageSources = setImageSources;