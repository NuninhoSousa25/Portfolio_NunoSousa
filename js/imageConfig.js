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
            src: 'images/slideshow/1.png',
            alt: 'Nuno Sousa Artwork 1'
        },
        image2: {
            src: 'images/slideshow/2.jpg',
            alt: 'Nuno Sousa Artwork 2'
        },
        image3: {
            src: 'images/slideshow/3.jpg',
            alt: 'Digital Debris Frame'
        },

        image4: {
            src: 'images/slideshow/0(5).jpg',
            alt: 'Some fun'
        }
    },
    
    profile: {
        main: {
            src: 'images/profile/1.jpg',
            alt: 'Nuno Sousa - 3D Artist'
        }
    },
    
    products: {
        vertexGroupToSculptMask: {
            src: 'images/products/Product-1.png',
            alt: 'Vertex Group to Sculpt Mask'
        },
        voxelMaster: {
            src: 'images/products/Product-2.jpg',
            alt: 'Voxel Master'
        },
        
    },
    
    projects: {
        digitalDebris: {
            main: {
                src: 'images/projects/digital-debris/placeholder-image-1.jpg',
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
          
        },
        
        comingSoon: {
            placeholder: {
                src: 'images/projects/digital-debris/placeholder-image-1.jpg',
                alt: 'Coming Soon'
            }
        },
        
        limbo: {
            main: {
                src: 'images/projects/limbo/1638058792448.jpg',
                alt: 'Limbo - Main Image'
            },
            gallery: [
                {
                    src: 'images/projects/limbo/1638058792468.jpg',
                    alt: 'Limbo - Gallery Image 1'
                },
                {
                    src: 'images/projects/limbo/1638058925360.jpg',
                    alt: 'Limbo - Gallery Image 2'
                },

                 {
                    src: 'images/projects/limbo/untitled3.jpg',
                    alt: 'Limbo - Gallery Image 2'
                },

                {
                    src: 'images/projects/limbo/untitled2.png',
                    alt: 'Limbo - Gallery Image 3'
                },
                {
                    src: 'images/projects/limbo/1755350639640.jpg',
                    alt: 'Limbo - Gallery Image 2'
                },
               
            ],
            video: {
                src: 'images/projects/limbo/VID_20211021_224756.mp4',
                alt: 'Limbo - Performance Video'
            }
        },
        
        oCaco: {
            main: {
                src: 'images/projects/o-caco/your-image-name.jpg',
                alt: 'O Caco - Main Image'
            }
        },
        
        sediments: {
            main: {
                src: 'images/projects/sediments/Sediments%20%231221.jpg',
                alt: 'Sediments - Main Image'
            },
            gallery: [
                {
                    src: 'images/projects/sediments/Image40028.jpg',
                    alt: 'Sediments - Gallery Image 1'
                },
                {
                    src: 'images/projects/sediments/Sediments%20%231795_waifu2x_2x_jpg.png',
                    alt: 'Sediments - Gallery Image 2'
                },
                {
                    src: 'images/projects/sediments/Sediments%20%232234.jpg',
                    alt: 'Sediments - Gallery Image 3'
                },
                {
                    src: 'images/projects/sediments/Sediments%20%233423_waifu2x_2x_jpg.png',
                    alt: 'Sediments - Gallery Image 4'
                },
                {
                    src: 'images/projects/sediments/Sediments%20%235471_waifu2x_2x_jpg.png',
                    alt: 'Sediments - Gallery Image 5'
                },
                {
                    src: 'images/projects/sediments/Sediments%20%23783%20(Personalizar).png',
                    alt: 'Sediments - Gallery Image 6'
                }
            ],
            videos: [
                {
                    src: 'images/projects/sediments/0001-0046.mp4',
                    alt: 'Sediments - Process Video 1'
                },
                {
                    src: 'images/projects/sediments/0001-0046_waifu2x_1x_4n_mp4.mp4',
                    alt: 'Sediments - Enhanced Process Video'
                }
            ]
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
        
        osNossosSeresSaoIguais: {
            main: {
                src: 'images/projects/os-nossos-seres-sao-iguais/1.jpg',
                alt: 'Our Beings Are Alike - Main Image'
            },
            gallery: [
                {
                    src: 'images/projects/os-nossos-seres-sao-iguais/2.jpg',
                    alt: 'Our Beings Are Alike - Gallery Image 1'
                },
                {
                    src: 'images/projects/os-nossos-seres-sao-iguais/3.jpg',
                    alt: 'Our Beings Are Alike - Gallery Image 2'
                },
                {
                    src: 'images/projects/os-nossos-seres-sao-iguais/6.jpg',
                    alt: 'Our Beings Are Alike - Gallery Image 3'
                },
                {
                    src: 'images/projects/os-nossos-seres-sao-iguais/8.jpg',
                    alt: 'Our Beings Are Alike - Gallery Image 4'
                },
                {
                    src: 'images/projects/os-nossos-seres-sao-iguais/9.jpg',
                    alt: 'Our Beings Are Alike - Gallery Image 5'
                },
                {
                    src: 'images/projects/os-nossos-seres-sao-iguais/12.jpg',
                    alt: 'Our Beings Are Alike - Gallery Image 6'
                },
                {
                    src: 'images/projects/os-nossos-seres-sao-iguais/13.jpg',
                    alt: 'Our Beings Are Alike - Gallery Image 7'
                },
                {
                    src: 'images/projects/os-nossos-seres-sao-iguais/14.jpg',
                    alt: 'Our Beings Are Alike - Gallery Image 8'
                }
            ]
        },
        
        aStudyIn3D: {
            main: {
                src: 'images/projects/ai-generated-artwork.png',
                alt: 'A Study in 3D - Main Image'
            },
            gallery: [
                {
                    src: 'images/projects/artwork-detail-1.webp',
                    alt: 'A Study in 3D - Detail 1'
                },
                {
                    src: 'images/projects/artwork-detail-2.webp',
                    alt: 'A Study in 3D - Detail 2'
                },
                {
                    src: 'images/projects/artwork-detail-3.webp',
                    alt: 'A Study in 3D - Detail 3'
                },
                {
                    src: 'images/projects/artwork-main.webp',
                    alt: 'A Study in 3D - Main Artwork'
                },
                {
                    src: 'images/projects/artwork-variant-1.webp',
                    alt: 'A Study in 3D - Variant'
                },
                {
                    src: 'images/projects/procedural-texture.png',
                    alt: 'A Study in 3D - Procedural Texture'
                }
            ]
        },
        
        iCantLiveWithoutYou: {
            main: {
                src: 'images/projects/Gemini_Generated_Image_uvusrtuvusrtuvus.jpg',
                alt: 'I Can\'t Live Without You - Main Image'
            },
            gallery: [
                {
                    src: 'images/projects/ChatGPT Image Apr 21, 2025, 01_39_21 PM.webp',
                    alt: 'I Can\'t Live Without You - AI Generated Imagery'
                },
                {
                    src: 'images/projects/image (3).webp',
                    alt: 'I Can\'t Live Without You - Interactive Interface'
                },
                {
                    src: 'images/projects/image (4).webp',
                    alt: 'I Can\'t Live Without You - Digital Consciousness'
                },
                {
                    src: 'images/projects/WhatsApp Image 2022-08-24 at 23.34.15.jpeg',
                    alt: 'I Can\'t Live Without You - Process Documentation'
                },
                {
                    src: 'images/projects/Ignorance.webp',
                    alt: 'I Can\'t Live Without You - Conceptual Studies'
                }
            ]
        },
        
        misc: {
            telephone: {
                src: 'images/projects/Ceci n\'est pas un Telephone (3_4 sedimentss).webp',
                alt: 'Ceci n\'est pas un Telephone'
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