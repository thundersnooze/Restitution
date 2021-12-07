import glob
import json
import urllib.request

# All files en.json in current folder recursively
the_path = ''
# output folder
the_images_path = 'images/'

files = glob.glob(the_path + "**/en.json", recursive=True)
for f in files:
    with open(f) as file:
        data = json.load(file)
        if 'hasView' in data:
            data = data['hasView']
            label = data[0]['skos:prefLabel']
            url = data[0]['nave:thumbLarge']
            img = url[url.rfind('/')+1:url.find('?')]
            print('File: ', f, '; Label: ', label, '; Image: ', img)
            urllib.request.urlretrieve(data[0]['nave:thumbLarge'], the_images_path+img)
