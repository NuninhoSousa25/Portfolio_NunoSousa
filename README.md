# Nuno Sousa - 3D Artist Portfolio

This is the personal portfolio website for Nuno Sousa, a 3D artist, teacher, and researcher.

## File Structure

```
webpage/
├── index.html               # Main HTML file
├── css/
│   └── styles.css           # All styling rules
├── js/
│   ├── main.js              # Main JavaScript functionality
│   └── projects-data.js     # Projects data structure
└── images/
    ├── slideshow/           # Homepage slideshow images
    ├── projects/            # Project images organized by folders
    │   ├── dimensional-studies/
    │   ├── digital-debris/
    │   ├── sediments/
    │   ├── gathered-fragments/
    │   ├── nossos-seres/
    │   ├── limbo/
    │   ├── o-caco/
    │   └── forget-to-protect/
    └── profile/             # Profile photos
```

## Products & Resources

### Blender Market Products
I offer professional Blender assets and tools on Blender Market:

- [Product 1 Name](https://blendermarket.com/your-product-link) - Brief description of your product.
- [Product 2 Name](https://blendermarket.com/your-product-link) - Brief description of your product.

### Gumroad Products
Additional resources and tutorials available on Gumroad:

- [Product 1 Name](https://gumroad.com/your-product-link) - Brief description of your product.
- [Product 2 Name](https://gumroad.com/your-product-link) - Brief description of your product.

## How to Maintain the Website

### Adding a New Project

1. **Add project images:**
   - Place project images in the appropriate folder under `images/projects/[project-id]/`
   - You can use any filename without renaming

2. **Create project HTML page:**
   - Copy an existing project HTML file as a template
   - Update all content including title, description, image paths, and metadata
   - Save the file as `[project-id].html` in the projects folder

3. **Update main page:**
   - Add the new project to the project grid in `index.html`:

```html
<div class="project-item">
    <a href="projects/[project-id].html">
        <img src="images/projects/[project-id]/your-image.jpg" alt="Project Title">
        <div class="project-title">Project Title: Subtitle</div>
    </a>
</div>
```

### Updating Slideshow Images

1. Simply place your new images in the `images/slideshow/` folder
2. Update the image paths in `index.html` under the "slideshow-container" section:

```html
<div class="slide">
    <img src="images/slideshow/your-new-image.jpg" alt="Slide description">
</div>
```

### Updating Profile Image

1. Place your new profile image in the `images/profile/` folder
2. Update the image path in `index.html` in the "about" section:

```html
<img src="images/profile/your-new-image.jpg" alt="Nuno Sousa - 3D Artist" class="about-image">
```

### Adding Product Links

1. Open `index.html` and add a new section for your products after the projects section:

```html
<section id="products">
    <h2>PRODUCTS</h2>
    <p>Explore my 3D assets, tools, and educational resources available on Blender Market and Gumroad.</p>
    
    <div class="products-container">
        <!-- Blender Market products -->
        <div class="product-category">
            <h3>Blender Market</h3>
            <div class="product-grid">
                <div class="product-item">
                    <a href="https://blendermarket.com/your-product-link" target="_blank">
                        <img src="images/products/product-1.jpg" alt="Product 1 Name">
                        <div class="product-title">Product 1 Name</div>
                    </a>
                </div>
                <!-- More products here -->
            </div>
        </div>
        
        <!-- Gumroad products -->
        <div class="product-category">
            <h3>Gumroad</h3>
            <div class="product-grid">
                <div class="product-item">
                    <a href="https://gumroad.com/your-product-link" target="_blank">
                        <img src="images/products/product-3.jpg" alt="Product 3 Name">
                        <div class="product-title">Product 3 Name</div>
                    </a>
                </div>
                <!-- More products here -->
            </div>
        </div>
    </div>
</section>
```

2. Update the navigation menu to include the products section:

```html
<nav id="main-nav">
    <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#cv">CV</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>
```

3. Add corresponding styles to `styles.css` (see Advanced Customization section)

## Advanced Customization

### Changing Colors and Styling

All styling is contained in `css/styles.css`. Here are key sections:

- **Color Scheme**: Look for color values like `#121212`, `#f0f0f0`, etc.
- **Typography**: Font sizes and styles are at the top of the file
- **Layout**: Each section has its own CSS code block with clear comments

### Adding New Sections

1. Add HTML markup in `index.html`
2. Add corresponding styles in `css/styles.css`
3. If the section needs interactivity, add JavaScript in `js/main.js`
4. Update the page index dots and navigation in `index.html`

### Product Page Template

If you want to create standalone product pages with documentation, create a new folder called `products/` and use the following template for each product page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Product Name] - Nuno Sousa</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/product.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="../index.html#home">Home</a></li>
                <li><a href="../index.html#projects">Projects</a></li>
                <li><a href="../index.html#products">Products</a></li>
                <li><a href="../index.html#about">About</a></li>
                <li><a href="../index.html#cv">CV</a></li>
                <li><a href="../index.html#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main class="product-page">
        <section class="product-hero">
            <h1>[Product Name]</h1>
            <div class="product-purchase">
                <a href="https://blendermarket.com/your-product-link" class="btn primary-btn" target="_blank">Purchase on Blender Market</a>
                <a href="https://gumroad.com/your-product-link" class="btn secondary-btn" target="_blank">Get on Gumroad</a>
            </div>
        </section>

        <section class="product-content">
            <div class="product-gallery">
                <div class="gallery-main">
                    <img src="../images/products/[product-id]/main.jpg" alt="[Product Name]">
                </div>
                <div class="gallery-thumbs">
                    <img src="../images/products/[product-id]/thumb1.jpg" alt="Feature 1">
                    <img src="../images/products/[product-id]/thumb2.jpg" alt="Feature 2">
                    <img src="../images/products/[product-id]/thumb3.jpg" alt="Feature 3">
                </div>
            </div>

            <div class="product-overview">
                <h2>Product Overview</h2>
                <p>
                    [Detailed product description goes here. Explain what the product is,
                    who it's for, and what problems it solves.]
                </p>
                <div class="product-features">
                    <div class="feature">
                        <h3>Feature 1</h3>
                        <p>[Description of feature 1]</p>
                    </div>
                    <div class="feature">
                        <h3>Feature 2</h3>
                        <p>[Description of feature 2]</p>
                    </div>
                    <div class="feature">
                        <h3>Feature 3</h3>
                        <p>[Description of feature 3]</p>
                    </div>
                </div>
            </div>

            <div class="product-documentation">
                <h2>Documentation</h2>
                
                <div class="doc-section">
                    <h3>Getting Started</h3>
                    <p>[Instructions for installation and initial setup]</p>
                    <ol>
                        <li>[Step 1]</li>
                        <li>[Step 2]</li>
                        <li>[Step 3]</li>
                    </ol>
                </div>
                
                <div class="doc-section">
                    <h3>Basic Usage</h3>
                    <p>[Instructions for basic usage]</p>
                </div>
                
                <div class="doc-section">
                    <h3>Advanced Techniques</h3>
                    <p>[Instructions for advanced usage]</p>
                </div>
                
                <div class="doc-section">
                    <h3>Troubleshooting</h3>
                    <p>[Common issues and their solutions]</p>
                </div>
            </div>
        </section>
        
        <div class="product-cta">
            <h2>Ready to Get Started?</h2>
            <p>Get [Product Name] now and take your 3D projects to the next level.</p>
            <div class="cta-buttons">
                <a href="https://blendermarket.com/your-product-link" class="btn primary-btn" target="_blank">Purchase on Blender Market</a>
                <a href="https://gumroad.com/your-product-link" class="btn secondary-btn" target="_blank">Get on Gumroad</a>
            </div>
        </div>
    </main>

    <footer>
        <p>&copy; 2025 Nuno Sousa. All rights reserved.</p>
    </footer>

    <script src="../js/main.js"></script>
</body>
</html>
```

Create a `css/product.css` file with the necessary styling for the product pages.