from google.cloud.sql.connector import Connector
import sqlalchemy

INSTANCE_CONNECTION_NAME='kumaaraso:us-central1:kumaaraso'
DB_USER = 'user'
DB_PASS = ''
DB_NAME = 'audio'

# initialize Connector object
connector = Connector()

# function to return the database connection object
def getconn():
    conn = connector.connect(
        INSTANCE_CONNECTION_NAME,
        "pymysql",
        user=DB_USER,
        password=DB_PASS,
        db=DB_NAME,
    )
    return conn

# create connection pool with 'creator' argument to our connection object function
pool = sqlalchemy.create_engine(
    "mysql+pymysql://",
    creator=getconn,
)

# create table if it doesn't exist already
with pool.connect() as conn:
    conn.execute(
        sqlalchemy.text(
            "CREATE TABLE IF NOT EXISTS audio (id INT NOT NULL AUTO_INCREMENT, path VARCHAR(255) NOT NULL, PRIMARY KEY (id))"
        )
    )
    

# function to fetch all records from the database
def fetch_all():
    with pool.connect() as conn:
        results = conn.execute(sqlalchemy.text("SELECT * FROM audio")).fetchall()
        
    return results

# add the path to the database
def add_entry(path):
    with pool.connect() as conn:
        conn.execute(sqlalchemy.text("INSERT INTO audio (path) VALUES (:path)"), path=path)
        conn.commit()
        
    return True