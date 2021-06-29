from jinja2 import Environment, PackageLoader, select_autoescape
from toml import loads

from random import shuffle

# Set up jinja template builder
env = Environment(
    loader = PackageLoader("template"),
    autoescape = select_autoescape
)

n_exp = []

if __name__ == "__main__":
    # Script executes twice outside the main block because of it being imported twice(?)

    # Loads context as toml
    context = loads(open("feedin.toml").read())
    
    # Listifies card entires in toml
    context["cards"] = list(context["cards"].values())
    
    context["n_exp"] = list(context["n_exp"].values())

    shuffle(context["cards"])

    template = env.get_template("index.html")
    print(template.render(context))

