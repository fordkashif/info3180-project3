
from project import db,bcrypt
from datetime import datetime, timedelta
import random
from uuid import uuid4

def generate_token():
    return ''.join(random.choice('ewfgeygr4t57wt4r63rtdu3w4hyrue4fnhtgbf4d8nh389y54r7384y7') for i in range(16))



class User(db.Model):
    userid = db.Column(db.Integer, primary_key=True)
    display_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80), nullable=False)
    profile_added_on = db.Column(db.DateTime, nullable=False)
    wishes = db.relationship('Wish',backref='user')
    tokens = db.relationship('AuthToken', backref='User',
        lazy='dynamic')



    def __init__(self ,userid,display_name,email,password,profile_added_on):
        self.userid=userid
        self.display_name = display_name
        self.email = email
        self.password = bcrypt.generate_password_hash(password)
        self.profile_added_on = profile_added_on

    def to_json(self):
        return dict(userid=self.userid,display_name=self.display_name,
                    email=self.email,profile_added_on=self.profile_added_on)

class AuthToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(200), unique=True)
    created_at = db.Column(db.DateTime())
    expire_at = db.Column(db.DateTime())
    user_id = db.Column(db.Integer, db.ForeignKey('user.userid'))

    def __init__(self, days=60):
        self.token = uuid4().hex
        self.created_at = datetime.utcnow()
        self.expire_at = datetime.utcnow()

    def get_token(self):
        return self.token

    def get_user_id(self):
        return self.user_id

    def __repr__(self):
        return {
            'token': self.token,
            'expire_at': self.expire_at,
            'created_at': self.created_at,
            'user_id': self.user_id
            }


class Wish(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    priority = db.Column(db.Integer,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.userid), nullable=False)
    title = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    imageUrl = db.Column(db.String, nullable=False)
    added_on = db.Column(db.DateTime,nullable=False)

    def __init__(self, Id, priority, user_id, title, url, description, imageUrl, added_on):
        self.Id = Id
        self.priority = priority
        self.user_id = user_id
        self.title = title
        self.url = url
        self.description = description
        self.imageUrl = imageUrl
        self.added_on = added_on

    def get_id(self):
        return  unicode(self.Id)


db.create_all()

