import {StructureBuilder} from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Blog content
      S.listItem()
        .title('Blog Posts')
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
        ),
      
      // Authors
      S.listItem()
        .title('Authors')
        .child(
          S.documentTypeList('author')
            .title('Authors')
        ),
      
      // Taxonomy
      S.listItem()
        .title('Taxonomy')
        .child(
          S.list()
            .title('Taxonomy')
            .items([
              S.listItem()
                .title('Categories')
                .child(S.documentTypeList('category').title('Categories')),
              S.listItem()
                .title('Tags')
                .child(S.documentTypeList('tag').title('Tags')),
            ])
        ),
      
      // Show the remaining document types with their default list view
      ...S.documentTypeListItems().filter(
        (listItem) => !['post', 'author', 'category', 'tag'].includes(listItem.getId() as string)
      ),
    ])