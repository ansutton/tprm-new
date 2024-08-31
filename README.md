# TPRM-Accelerator

## Environment Setup

### Python Backend

* Install Python 3.10 (on Windows, use the [Microsoft Store](https://apps.microsoft.com/detail/9pjpw5ldxlz5?hl=en-us&gl=US))
* Create a [virtual Python environment](https://medium.com/@lucasthedev/a-comprehensive-guide-to-python-virtual-environments-with-venv-cb76fea6a550) for the project by running:

```powershell
python -m venv .venv
```

* PowerShell users will need to run the following command to enable running PowerShell scripts:

```powershell
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser
```

* Activate the virtual Python environment by running:

```powershell
.\.venv\Scripts\Activate.ps1
```

> <b>Note A</b>: Anytime you run the Python flask server, it's best practice to do so inside this virtual environment.

> <b>Note B</b>: By setting up the .venv in the root directory of the project VS Code will pick up the newly created virtual environment. The Python interpreter can be switched in the bottom right area of the editor when a Python file is opened and focused. Doing this will avoid the need to activate the virtual environment via PowerShell.

* ``cd /server``
* Install Python dependencies by running:

```powershell
pip install -r requirements.txt
```

* Start Flask server by running:

```powershell
python app.py
```

> <b>Note</b>: Installing dependencies using the ``requirements.txt`` file may not have successfully installed all the necessary dependencies. Run ``pip install <package name>`` for whatever Python complains about and then try starting the Flask server again.

### Endpoint Testing

* Download [Postman](https://www.postman.com/downloads/)

* With the Flask server succesfully running setup a new POST request in Postman targeting the following endpoint:

```
http://localhost:8001/load_document
```

* Include the following payload as ``Body > raw > JSON``:

```JSON
{
    "filePath": "C:/Users/jacwallace/Repos/TPRM-Accelerator/training_data/office_s1_e4.txt"
}
```

> <b>Note A</b>: Replace the ``filePath`` value with the file path for wherever this file is located on your machine. Replace back slashes -> ``\`` with forward slashes -> ``/``.

> <b>Note B</b>: Python may complain and tell you to ``pip install chromadb`` if you haven't already.

* Once document is successfully loaded, setup a new POST request in Postman targeting:

```
http://localhost:8001/generate_rag
```

* Include the following payload as ``Body > raw > JSON``:
a

```JSON
{
   "text": "What is the Alliance about in this episode?"
}
```

> <b>Note</b>: The ``text`` value can be modified to include any relevant question to the ingested data.
___

### Dev Environment

* For QoL improvement, install [Mypy](https://www.mypy-lang.org/) (a static type checker), [Pylint](https://pypi.org/project/pylint/) (a linter), and [Black](https://black.readthedocs.io/en/stable/index.html) (a formatter) at a system level, not in the virtual environment.
* For Mypy run:

```powershell
pip install mypy
```

In addition to this, you should install the [Microsoft authored Mypy Type Checker VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker).

* For Pylint run:

```powershell
pip install pylint
```

In addition to this, you should install the [Microsoft authored Pylint VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint).
Running a lint check can be done by running the following command at the root level of the directory:

```powershell
pylint server
```

* For Black run:

```powershell
pip install black
```

Running an automatic format fix can be done by running the following command at the root level of the directory:

```powershell
black server
```

___

### TypeScript & Next.js Frontend

* Install [NodeJS](https://nodejs.org/en)
* ``cd /client``
* Run the following ``npm`` commands:

```powershell
npm install
npm run build
npm run dev
```

* Navigate to ``http://localhost:3000``

___

## Packaging
TPRM Accelerator is intended to run out-of-the-box on users' local machines. To achieve this, we have packaging steps for TPRM Accelerator's primary dependencies including Python, JavaScript and Ollama.

### Python Flask Server with PyInstaller
We use [PyInstaller](https://pyinstaller.org/en/stable/) to output an .exe program that includes all required Python dependencies (both the packages and the interpreter).

To package the latest changes into a .exe format, ``cd /server`` and run:

```powershell
pyinstaller pyinstaller.spec
```

This will bundle the Python scripts into a single executable called ``app.exe`` which can be found here: ``server/dist/tprm_accelerator/app.exe``.

> <b>Note</b>: Alongside the .exe file you will see various DLLs which are also required to run the Flask server without a system installed Python interpreter. When distributing you should include everything that's found in ``server/dist/tprm_accelerator/``.

Also, PyInstaller won't successfully link all the binaries necessary for the program to run on it's own. In the ``pyinstaller.spec`` file you will see the binaries field in the Analysis section here:

```spec
# -*- mode: python ; coding: utf-8 -*-
import sys ; sys.setrecursionlimit(sys.getrecursionlimit() * 5)


a = Analysis(
    ['app.py'],
    pathex=[],
    binaries=[
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\numpy.libs\\libopenblas64__v0.3.23-293-gc2f4bdbb-gcc_10_3_0-2bde3a66a51006b2b53eb373ff767a3f.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\faiss_cpu.libs\\libomp140.x86_64-342e80c06daee0da2e436795e93b0163.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\faiss_cpu.libs\\libomp-7dc934d99dfa591f473ae5d975972b7c.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\faiss_cpu.libs\\openblas-54c31036ecda6ab8856f9aac9fdee712.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\faiss_cpu.libs\\msvcp140-b9d2f1930e3a04e4b9f88e2514052f10.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\faiss_cpu.libs\\flangrti-5bbaf6aff159e72f9b015d5bc31c7584.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\faiss_cpu.libs\\flang-d38962844214aa9b06fc3989f9adae5b.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\torch\\lib\\torch_python.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\torch\\lib\\fbgemm.dll', '.'),
        ],
        # ...
```

> <b>Note</b>: I am manually setting the paths to where these binaries live on my local machine in the virtual environment I'm using to run and build the project. For another local machine to successfully build the Python Flask server via the PyInstaller process, each of these paths would need to modified to the location of their own virtual environment's binaries' paths. Also note, there's probably a relative way to import these, just not sure how to do it in the ``pyinstaller.spec`` file.

___

### Next.js Desktop Client with Electron
We use [Electron](https://www.electronjs.org/) to output a native desktop application that includes all JavaScript dependencies (both the packages and the Node runtime).

To package the latest changes into a .exe format, ``cd /desktop`` and set the new version number in ``package.json`` like so:

```json
{
    "name": "desktop",
    "private": true,
    "version": "0.0.2-alpha", // <- modify this field.
    "type": "module",
    // ...
```

Then run:

```powershell
npm run build
```

Once the build completes, go to: ``/desktop/release/0.0.2-alpha`` where the release folder will be named after whatever value you set in the ``version`` field in ``/desktop/package.json``.

In the release version folder you will see a filed called ``TPRM Accelerator-Windows-0.0.2-alpha-Setup.exe``. Run this program and walk through the installer.

The output will default to: ``%Appdata%\Local\Programs\TPRM Accelerator``.

All the contents in that output folder ``TPRM Accelerator`` should be included in the software package to distribute.

To run the client application, open the ``TPRM Accelerator.exe`` file.

___

### Ollama
See [integrating Ollama as a standalone service](https://github.com/ollama/ollama/blob/main/docs/windows.md#standalone-cli).

See [Ollama downloads](https://github.com/ollama/ollama/releases/tag/v0.3.8).

More instructions coming soon...

___

### Builds

For the latest builds, check the [releases](https://github.com/Deloitte-Default/TPRM-Accelerator/releases). You will need access to the Cyber AI SharePoint link to download.

___

## GitHub SSH Instructions

Eliminate need to authenticate on every git command.

While following [these steps](https://www.freecodecamp.org/news/how-to-fix-git-always-asking-for-user-credentials/), follow [these steps](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key) to generate a new SSH public key. You probably want to skip the session and timeout steps so that you don't have to repeat these steps again after a timeout. After generating a new SSH key, store the SSH in the SSH key setting in your GitHub settings online. Authorize the Deloitte organizations in the dropdown there. Test out on your local machine with a git command like `git fetch origin` in your repo to see if it no longer prompts for authentication.
