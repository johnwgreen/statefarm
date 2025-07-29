export default function decorate(block) {
  block.innerHTML = ''; // Clears the existing content of the block

  // Create the main container div
  const mainDiv = document.createElement('div');
  block.append(mainDiv);

  // ---
  // Create the form element
  const form = document.createElement('form');
  form.className = 'my-custom-form'; // Add a class for styling if needed

  // Add radio buttons with images
  const radioButtonsContainer = document.createElement('div');
  radioButtonsContainer.className = 'radio-buttons-container';

  // Example radio button 1
  const radio1Label = document.createElement('label');
  radio1Label.innerHTML = `
    <input type="radio" name="designOption" value="ADBDEMO/Don Stolper-1">
    <img src="https://author-p48154-e244509.adobeaemcloud.com/content/dam/State%20Farm/headshots/Don%20Stolper.png?text=Image+1" alt="Design Option 1">
    <span>Don Stolper</span>
  `;
  radioButtonsContainer.append(radio1Label);

  // Example radio button 2
  const radio2Label = document.createElement('label');
  radio2Label.innerHTML = `
    <input type="radio" name="designOption" value="ADBDEMO/Brian Stolper-1">
    <img src="https://s7d1.scene7.com/is/image/ADBDEMO/Brian%20Stolper?$Responsive$" alt="Design Option 2">
    <span>Brian Stolper</span>
  `;
  radioButtonsContainer.append(radio2Label);

  // Example radio button 3
  const radio3Label = document.createElement('label');
  radio3Label.innerHTML = `
    <input type="radio" name="designOption" value="Sharon Sullivan-1">
    <img src="https://author-p48154-e244509.adobeaemcloud.com/content/dam/State%20Farm/headshots/nobackground/Sharon%20Sullivan.png??text=Image+3" alt="Design Option 3">
    <span>Sharon Sullivan</span>
  `;
  radioButtonsContainer.append(radio3Label);

  // Example radio button 4
  const radio4Label = document.createElement('label');
  radio4Label.innerHTML = `
    <input type="radio" name="designOption" value="ADBDEMO/William Frank-1">
    <img src="https://author-p48154-e244509.adobeaemcloud.com/content/dam/State%20Farm/headshots/nobackground/William%20Frank.png??text=Image+4" alt="Design Option 4">
    <span>William Frank</span>
  `;
  radioButtonsContainer.append(radio4Label);

  form.append(radioButtonsContainer);

  // ---
  // Add a dropdown (select element)
  const dropdownLabel = document.createElement('label');
  dropdownLabel.textContent = 'Select an Office:';
  const select = document.createElement('select');
  select.name = 'office';
  select.id = 'office-select';

  const option1 = document.createElement('option');
  option1.value = '123main';
  option1.textContent = '123 Main Street';
  // St. Paul, MN 55112-9583
  // joe@joesmith.com
  select.append(option1);

  const option2 = document.createElement('option');
  option2.value = '424';
  option2.textContent = '424 Hadley Drive, Suite F';
  // Manhattan Beach, CA 90266-1671
  select.append(option2);

  const option3 = document.createElement('option');
  option3.value = 'cat3';
  option3.textContent = 'Category 3';
  select.append(option3);

  dropdownLabel.append(select);
  form.append(dropdownLabel);

  // ---
  // Add the 'Preview' button
  const previewButton = document.createElement('button');
  previewButton.type = 'submit'; // Or 'button' if you handle submission with JS
  previewButton.textContent = 'Preview';
  previewButton.className = 'preview-button';
  form.append(previewButton);

  // Append the form to the block
  block.append(form);

  // --
  // Add a preview area
  // Create an image element
  const previewContainer = document.createElement('div');
  previewContainer.id = 'review';
  const img = document.createElement('img');

  // Set the image source
  img.src = 'https://author-p48154-e244509.adobeaemcloud.com/content/dam/State%20Farm/headshots/nobackground/William%20Frank.png'; // Replace with your image URL

  // Set optional attributes (e.g., alt text, width, height)
  img.alt = 'Placeholder Image';
  img.width = 150;
  img.height = 150;
  previewContainer.append(img);
  block.append(previewContainer);

  // You might want to add event listeners here for form submission or radio button changes
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form submitted!');
    // Add your logic to handle the preview here
    const selectedOption = form.querySelector('input[name="designOption"]:checked');
    const selectedCategory = form.querySelector('#office-select');

    var imageURL = 'https://s7d1.scene7.com/is/image/ADBDEMO/business-card?';
    var pictureURL = '$picture=' + selectedOption.value; // + '&';
    var agentName = '$name=' + selectedOption +'&';
    var address = '$address=%3C%3CAddress%3E%3E&$city=%3C%3CCity%3E%3E%2C%20%3CState%3E%3E%20%20%3CZip%3E%3E&';
    var phoneNumber = '$phone=%3C%3CPhone%3E%3E&';
    var emailAddress = '';

    previewContainer.innerHTML = '<img src="' + imageURL + pictureURL + '">';
  });
}
