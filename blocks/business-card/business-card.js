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
  radioButtonsContainer.className = 'radio-buttons-container'; // This will be our grid container

  // Helper function to create a person's selection card
  const createPersonCard = (name, imageUrl, value) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'person-selection-card'; // New class for each card

    const nameSpan = document.createElement('span');
    nameSpan.className = 'person-name';
    nameSpan.textContent = name;
    cardDiv.append(nameSpan);

    const img = document.createElement('img');

    img.src = imageUrl;
    img.alt = name;
    cardDiv.append(img);

    const label = document.createElement('label'); // Keep label for accessibility
    label.className = 'radio-label'; // New class for the radio button label
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'designOption';
    input.value = value;
    label.append(input);
    // You can add a visual indicator here if needed, but CSS will handle the actual circle
    // label.innerHTML += '<div class="radio-indicator"></div>'; // Optional visual indicator

    cardDiv.append(label); // Append the label containing the radio button to the card
    return cardDiv;
  };

  // Populate using the helper function
  radioButtonsContainer.append(createPersonCard(
    'Don Stolper',
    'https://s7d1.scene7.com/is/image/ADBDEMO/Don Stolper-1',
    'ADBDEMO/Don Stolper-1'
  ));
  radioButtonsContainer.append(createPersonCard(
    'Brian Stolper',
    'https://s7d1.scene7.com/is/image/ADBDEMO/Brian%20Stolper?$Responsive$',
    'ADBDEMO/Brian Stolper-1'
  ));
  radioButtonsContainer.append(createPersonCard(
    'Sharon Sullivan',
    'https://s7d1.scene7.com/is/image/ADBDEMO/Sharon Sullivan-1?$Responsive$',
    'Sharon Sullivan-1'
  ));
  radioButtonsContainer.append(createPersonCard(
    'William Frank',
    'https://s7d1.scene7.com/is/image/ADBDEMO/William Frank-1?$Responsive$',
    'ADBDEMO/William Frank-1'
  ));

  form.append(radioButtonsContainer);

  // ---
  // Add a dropdown (select element)
  const formControlsDiv = document.createElement('div');
  formControlsDiv.className = 'form-controls'; // New wrapper for select and button

  const dropdownLabel = document.createElement('label');
  dropdownLabel.textContent = 'Select an Office:';
  const select = document.createElement('select');
  select.name = 'office';
  select.id = 'office-select';

  const option1 = document.createElement('option');
  option1.value = '123';
  option1.textContent = '123 Main Street';
  select.append(option1);

  const option2 = document.createElement('option');
  option2.value = '424';
  option2.textContent = '424 Hadley Drive, Suite F';
  select.append(option2);

  dropdownLabel.append(select);
  formControlsDiv.append(dropdownLabel);

  // ---
  // Add the 'Preview' button
  const previewButton = document.createElement('button');
  previewButton.type = 'submit';
  previewButton.textContent = 'Preview';
  previewButton.className = 'preview-button';
  formControlsDiv.append(previewButton);

  form.append(formControlsDiv); // Append the new wrapper

  // Append the form to the block
  block.append(form);

  // --
  // Add a preview area (keep existing structure for this, just move it after the form)
  const previewContainer = document.createElement('div');
  previewContainer.id = 'review';
  const img = document.createElement('img');

  img.src = 'https://author-p48154-e244509.adobeaemcloud.com/content/dam/State%20Farm/headshots/nobackground/William%20Frank.png';
  img.alt = 'Placeholder Image';
  img.width = 150;
  img.height = 150;
  previewContainer.append(img);
  block.append(previewContainer);

  // Add event listener for form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted!');
    const selectedOption = form.querySelector('input[name="designOption"]:checked');
    const selectedOffice = form.querySelector('#office-select');
    const imageURL = 'https://s7d1.scene7.com/is/image/ADBDEMO/business-card?';
    let pictureURL = '';
    if (selectedOption) { // Check if an option is selected
        pictureURL = `$picture=${selectedOption.value}&`;
    }
    let agentName = '$name=';
    let address = '$address=';
    let phoneNumber = '$phone=';
    let emailAddress = '$email=';

    switch (selectedOffice.value) {
      case '123':
        address = '$address=123 Main Street&$city=St. Paul, MN&$zip=55112-9583&'; // Added $ for address, city, zip
        break;
      case '424':
        address = '$address=424 Hadley Drive, Suite F&$city=Manhattan Beach, CA&$zip=90266-1671&'; // Added $ for address, city, zip
        break;
      default:
    }

    switch (selectedOption?.value) { // Use optional chaining for selectedOption
      case 'ADBDEMO/William Frank-1':
        agentName += 'William Frank&';
        phoneNumber += '727.789.1234&';
        emailAddress += 'wfrank@statefarm.com';
        break;
      case 'Sharon Sullivan-1':
        agentName += 'Sharon Sullivan&';
        phoneNumber += '813.235.8521&';
        emailAddress += 'ssullivan@statefarm.com';
        break;
      case 'ADBDEMO/Brian Stolper-1':
        agentName += 'Brian Stolper&';
        phoneNumber += '404.687.5468&';
        emailAddress += 'bstolper@statefarm.com';
        break;
      case 'ADBDEMO/Don Stolper-1':
        agentName += 'Don Stolper&'; // Corrected name for Don Stolper
        phoneNumber += '305.348.9876&';
        emailAddress += 'dstolper@statefarm.com';
        break;
      default:
    }
    // Ensure all parameters are included in the URL, even if empty
    const finalURL = `${imageURL}${pictureURL}${agentName}${address}${phoneNumber}${emailAddress}`;
    previewContainer.innerHTML = `<img src="${finalURL}">`;
  });
}