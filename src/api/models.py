from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'User {self.id} - {self.email}'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active}


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique=False, nullable=True)
    body = db.Column(db.String, unique=False, nullable=False)
    date = db.Column(db.DateTime, nullable=False)  #Valor por defecto
    image_url = db.Column(db.String) # URL la obtenemos de cloudinary
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('post_to', lazy='select'))

    def __repr__(self):
        return f'post: {self.id} - {self.title}'
    
    def serialize(self):
        return {"id": self.id,
                "title": self.title,
                "description": self.description, 
                "body": self.body,
                "date": self.date,
                "image_url": self.image_url}


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, unique=False, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('comments_to', lazy='select'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('comments_to', lazy='select'))

class Media(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.Enum('image', 'video', 'podcast', name='media_type'))
    url = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('media_to', lazy='select'))


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to', lazy='select'))
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to', lazy='select'))

    def __repr__(self):
        return f'Following: {self.following_id} - Follower: {self.follower_id}'


class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    height = db.Column(db.String, unique=False)
    mass = db.Column(db.String, unique=False)
    hair_color = db.Column(db.String, unique=False)
    skin_color = db.Column(db.String, unique=False)
    eye_color = db.Column(db.String, unique=False)
    birth_year = db.Column(db.String, unique=False)

    def __repr__(self):
        return f'post: {self.id} - {self.name}'
    
    def serialize(self):
        return {"name": self.name,
                "height": self.height,
                "mass": self.mass, 
                "hair_color": self.hair_color,
                "skin_color": self.skin_color,
                "eye_color": self.eye_color,
                "birth_year": self.birth_year}


class FavoritesCharacters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('favorites_characters', lazy='select'))
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    character_to = db.relationship('Characters', foreign_keys=[character_id], backref=db.backref('user_to', lazy='select'))

    def __repr__(self):
        return f'post: {self.id} - {self.name}'
    
    def serialize(self):
        return {"user_id": self.user_id,
                "type": 'Characters'}


class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    diameter = db.Column(db.String, unique=False)
    rotation_period = db.Column(db.String, unique=False)
    orbital_period = db.Column(db.String, unique=False)
    gravity = db.Column(db.String, unique=False)
    population = db.Column(db.String, unique=False)
    climate = db.Column(db.String, unique=False)
    terrain = db.Column(db.String, unique=False)
    surface_water = db.Column(db.String, unique=False)

    def __repr__(self):
        return f'post: {self.id} - {self.name}'
    
    def serialize(self):
        return {"name": self.name,
                "diameter": self.diameter,
                "rotation_period": self.rotation_period, 
                "orbital_period": self.orbital_period,
                "gravity": self.gravity,
                "population": self.population,
                "climate": self.climate,
                "terrain": self.terrain,
                "surface": self.surface,}


class FavoritesPlanets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('favorites_planets', lazy='select'))
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'))
    planet_to = db.relationship('Planets', foreign_keys=[planet_id], backref=db.backref('planet_to', lazy='select'))

    def __repr__(self):
        return f'post: {self.id} - {self.name}'
    
    def serialize(self):
        return {"name": self.name,
                "type": 'Planets'}


class Starships(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    starship_class = db.Column(db.String, nullable=False)
    manufacturer = db.Column(db.String, nullable=False)
    length = db.Column(db.String, nullable=False)
    crew = db.Column(db.String, nullable=False)
    passengers = db.Column(db.String, nullable=False)
    max_atmosphering_speed = db.Column(db.String, nullable=False)
    hyperdrive_rating = db.Column(db.String, nullable=False)
    mglt = db.Column(db.String, nullable=False)
    cargo_capacity = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'post: {self.id} - {self.name}'
    
    def serialize(self):
        return {"name": self.name,
                "starship_class": self.starship_class,
                "manufacturer": self.manufacturer, 
                "length": self.length,
                "crew": self.crew,
                "passengers": self.passengers,
                "max_atmosphering_speed": self.max_atmosphering_speed,
                "mglt": self.mglt,
                "cargo_capacity": self.cargo_capacity,}

class FavoritesStarships(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('favorites_starships', lazy='select'))
    startship_id = db.Column(db.Integer, db.ForeignKey('starships.id'))
    startship_to = db.relationship('Starships', foreign_keys=[startship_id], backref=db.backref('startship_to', lazy='select'))

    def __repr__(self):
        return f'post: {self.id} - {self.name}'
    
    def serialize(self):
        return {"name": self.name,
                "type": 'Starships'}
