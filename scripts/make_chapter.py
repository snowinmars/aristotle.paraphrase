import os
import re
from pathlib import Path

root = Path(os.path.dirname(os.path.realpath(__file__)))


def get_last_filename(path):
    src_root = root.parent/'src'/'components'
    search_root = src_root/path

    data_files = []

    # bug for file indexes > 9
    for file in search_root.glob('**/*'):
        filename = f'{file.stem}{file.suffix}'
        if file.is_file() and re.search(r'b\d+_c\d+.*\.js', filename ):
            data_files.append(filename)

    last_data_file = data_files[-1]
    last_book_index, last_chapter_index, postfix = get_last_file_info(last_data_file)

    return f"b{last_book_index}_c{last_chapter_index + 1}{postfix}"


def get_last_file_info(data_file):
    regex_result = re.search(r'b(\d+)_c(\d+)(.*)', data_file)

    last_book_index = regex_result.group(1).split()[0]
    last_chapter_index = regex_result.group(2).split()[0]
    postfix = regex_result.group(3)

    return int(last_book_index), int(last_chapter_index), postfix


def main():
    notes_template = """const notes = `

[ref:paraphrase 0]
[ref:origin 0]
<sup>(1)</sup>

`;

export default notes;
"""

    chapter_template = """const text = `

[ref:origin 0]
[ref:paraphrase 0]
[ref:origin-notes 0]
[ref:paraphrase-notes 0]

`;

export default text;

"""

    origin_folder = 'Origin/b2'
    paraphrase_folder = 'Paraphrase/b2'
    origin_notes_folder = 'Origin/b2_notes'
    paraphrase_notes_folder = 'Paraphrase/b2_notes'

    last_origin_filename = get_last_filename(origin_folder)
    last_paraphrase_filename = get_last_filename(paraphrase_folder)
    last_origin_notes_filename = get_last_filename(origin_notes_folder)
    last_paraphrase_notes_filename = get_last_filename(paraphrase_notes_folder)

    component_root = root/'..'/'src'/'components'

    with open(component_root/origin_folder/last_origin_filename, 'a') as the_file:
        the_file.write(chapter_template)

    with open(component_root/paraphrase_folder/last_paraphrase_filename, 'a') as the_file:
        the_file.write(chapter_template)

    with open(component_root/origin_notes_folder/last_origin_notes_filename, 'a') as the_file:
        the_file.write(notes_template)

    with open(component_root/paraphrase_notes_folder/last_paraphrase_notes_filename, 'a') as the_file:
        the_file.write(notes_template)

    return


if __name__ == '__main__':
    print(f'from root {root}')
    main()
