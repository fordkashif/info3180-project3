# manage.py

from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from project import app, db
from project.models import User


migrate = Migrate(app, db)
manager = Manager(app)

# migrations
manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    db.create_all()


@manager.command
def drop_db():
    db.drop_all()


@manager.command
def create_admin():
    db.session.add(User(email='user@admin.com', password='password', admin=True))
    db.session.commit()


@manager.command
def create_data():
    pass


if __name__ == '__main__':
    manager.run()
