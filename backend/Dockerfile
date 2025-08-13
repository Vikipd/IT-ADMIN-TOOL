# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /app

# Copy the file with the list of packages and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your backend application code into the container
COPY . .

# This is the command that will be run to start your server.
# It tells gunicorn to run the 'wsgi' application inside your 'helpdesk' project folder.
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "helpdesk.wsgi"]