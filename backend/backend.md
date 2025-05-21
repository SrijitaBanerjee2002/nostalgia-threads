# Backend Setup Instructions  

This directory contains all backend-related files. You can replace it with your own `backend` directory or add your project files here.  

### 1. Create a Virtual Environment  

```sh
python -m venv venv
```  

Activate it:  

- **Windows:**  
  
  ```sh
  venv\Scripts\activate
  ```

- **macOS/Linux:**  
  
  ```sh
  source venv/bin/activate
  ```  

### 2. Install Dependencies  

If a `requirements.txt` file is available, install dependencies:  

```sh
pip install -r requirements.txt
```  

### 3. Run Migrations  

Apply initial database migrations:  

```sh
python manage.py migrate
```  

### 4. Create a Superuser  

To access the Django admin panel, create a superuser:  

```sh
python manage.py createsuperuser
```  

Follow the prompts to set up a username, email, and password.  

### 5. Start the Development Server  

Launch the Django development server:  

```sh
python manage.py runserver
```  

Visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to see the default Django page.  

To access the admin panel, go to [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) and log in with the superuser credentials.  

Your backend is now set up! 🚀
