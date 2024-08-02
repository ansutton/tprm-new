# TPRM-Accelerator

## Environment Setup

### Python Backend

* Install Python 3.10 (on Windows, use the [Microsoft Store](https://apps.microsoft.com/detail/9pjpw5ldxlz5?hl=en-us&gl=US))
* ``cd /server``
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
> <b>Note</b>: Anytime you run the Python flask server, it's best practice to do so inside this virtual environment.

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