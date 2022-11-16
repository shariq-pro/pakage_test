GitHub Package Setup

1. first step is convert component into typescript. So create a new react project and create a ‘lib folder’. Inside ‘lib folder’ create ‘component folder’ and ‘Index.js’ file. Inside ‘component folder’ you put your components.

2. After component set in component folder then export component in ‘index.js’ file.

3. After this step. Install these packages.

npm install --save-dev @babel/core @babel/cli @babel/preset-env 
npm install -save @babel/polyfill

4.  In the top-level folder of your project, add a file called babel.config.json and add the following presets:

{
"presets": [
[
"@babel/env",
{
"targets": {
"edge": "17",
"firefox": "60",
"chrome": "67",
"safari": "11.1"
},
"useBuiltIns": "usage",
"corejs": "3.6.5"
}
],
"@babel/preset-react"
]
}

5. In package.json , under scripts, replace the build script with the following:

"build": "rm -rf dist && NODE_ENV=production babel src/lib --out-dir dist –copy-files";

6. Run the command npm run build in the CLI.

7. If your build was successful and you write ls -a in the root folder, you will see a new folder called dist:

8. In the Root Folder dist folder created. Your code is convert into typescript Successfully.

Publish Package on Github:

1. Create a new public repo on github.

2. On Desktop, Create new folder and give it name ‘my-package’.

3. In ‘my-package’ folder past your component(which is located in dist folder). and also past your ‘index.js’ file in my-package folder.

4.after this step run this command in terminal.
Npm init.
Package name: default. Just Click Enter.
Version:  default. Just Click Enter.
Description : eg: my first package. Or anything else
entry point: (index.js)  Just Click Enter.
Test command:  Just Click Enter.
Git repository:  Just Click Enter.
Keywords:  Just Click Enter.
License: (ISC)  Just Click Enter
is this okay:  yes

After complete successfully. Your package.json file created automatically

5. Then run ‘npm I’ and create package-lock.json. 

6. Now go on github and open your account click on profile and go into settings →Developer settings → Personal access tokens → Tokens. Select write, read & delete packages options click on generate token and copy this token save on wordpad or notepad.

7. Create .npmrc file and this code.
 
@abd712:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=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

@abd712 → enter your github username
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 → replace with your git token

8. Then go in package.json and add the following code below repository.

"publishConfig": {
"registry": "https://npm.pkg.github.com"
},



9. Also check repository also go on github and copy repo https and paste in repository.



10. name → @abd712/my-package
	@abd712 → github name
	my-package → react app name

copy all packages from package.json which is use in component and paste in package.json.

11. Create a new file in root folder ‘.gitignore’. Paste this code in it.


12. Push code in repo now. Run this commands in terminal.
	→ git init
	→ git add .
	→ git commit -m “comments here”
	→ git push origin main
	→ git branch -M main
	→ git remote add origin ‘paste here github repo https’ like this
git remote add origin "https://github.com/abd712/my-package-repo.git"

	→ git push -u origin main

Now your code is successfully push on github.

13. Publish Package. Run command in terminal. This command create your github npm package.
	
npm publish
Now your package is successfully created in github packages.


 Use Package in React Project:

1. create .npmrc file in root project and paste here the same code which we created above. Like this



2. Install Package and you can use this component now.



3. That’s it !!!
4. App.js folder
5. import logo from './logo.svg';
import './App.css';
import Wallet from './lib/components/Wallet';
import { useState } from 'react';
import Walletmodal from './lib/components/Walletmodal';


function App() {
  const[get_wallet_address,set_wallet_address]=useState(false)
  const[get_modal_show,set_modal_show]=useState(false)
  function getMyWallet(props){
    console.log('getMyWallet',props)

    if(props){
      set_wallet_address(props)
      set_modal_show(false)
    }
  }
  
  function Mint_data(){
    if(get_wallet_address !=false){
      alert('Minting ....')

    }
    else{
      set_modal_show(true)

    }
  }
  return (
    <div className="App">
      {get_modal_show?<Walletmodal show={get_modal_show} onHide={()=>{set_modal_show(false)}} func={getMyWallet}/>  :''}
      <Wallet btn_name="Connect Wallet" btn_color="black" btn_text_color='white' func_wallet={getMyWallet} show_modal={get_modal_show} />
      <button onClick={()=>{Mint_data()}}>Mint</button>
    </div>
  );
}

export default App;

