import { RolesBuilder } from 'nest-access-control';

export default () => ({
  roles: new RolesBuilder({
    /**
     * Check below url to get to know the roles system
     * https://github.com/onury/accesscontrol/#defining-all-grants-at-once
     */
    admin: {
      user: {
        'read:any': ['id', 'name'],
      },
    },
  }),
});
