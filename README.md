# TPRM-Accelerator
## Dev Environment Setup
# test commit
### Backend
* Install Python 3.10 (on Windows, use the [Microsoft Store](https://apps.microsoft.com/detail/9pjpw5ldxlz5?hl=en-us&gl=US))
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

* Download [Postman](https://www.postman.com/downloads/)

> <b>Note</b>: The following backend setup bulletpoints subject to change (as of 07/16/2024).
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

### Frontend
* Install [NodeJS](https://nodejs.org/en)
* ``cd /client``
* Run the following ``npm`` commands:

```powershell
npm install
npm run build
npm run dev
```

* Navigate to ``http://localhost:3000``