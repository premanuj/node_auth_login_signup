/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert([
          {
            name: 'Anuj Subedi',
            updated_at: new Date()
          },
          {
            name: 'Rabin Gaire',
            updated_at: new Date()
          }
        ])
      ]);
    });
}
