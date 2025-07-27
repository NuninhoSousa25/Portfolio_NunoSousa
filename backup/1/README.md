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
    │   ├── a-study-in-3d
    │   ├── digital-debri/
    │   ├── sediments/
    │   ├── gathered-fragments/
    │   ├── nossos-seres/
    │   ├── limbo/
    │   ├── o-caco/
    │   └── forget-to-protect/
    └── profile/             # Profile photos
```

## How to Maintain the Website

### Adding a New Project

1. **Add project images:**
   - Place project images in the appropriate folder under `images/projects/[project-id]/`
   - You can use any filename without renaming

2. **Update project data:**
   - Open `js/projects-data.js`
   - Add a new project entry to the `PROJECTS` array:

```javascript
{
    id: "your-project-id",
    title: "Your Project Title",
    description: "Description of your project",
    imagePath: "images/projects/your-project-id/",
    imageFile: "your-image-filename.jpg",
    year: 2024
}
```

The projects will automatically appear on the website in the order they are listed in the array.

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