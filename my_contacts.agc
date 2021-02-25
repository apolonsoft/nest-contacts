{"version":1,"type":"collection","title":"my-contacts","queries":[{"version":1,"type":"window","query":"query {\n  myContacts(input: {contactQuery: \"\"}) {\n    id, \n    name {\n      firstName, middleName, lastName, legalName\n    },\n    nickName, \n    organization {\n      jobTitle, departmentName, organizationName\n    },\n    socials {\n    \tid, type\n    }, urls { url, type }\n    emails {\n      email, type\n    },\n    phones {\n      phone, type\n    }, \n    addresses {\n      type, \n      address {\n        postalCode, city { id }, street, subStreet, buildingName, \n      \tflatNumber, buildingNumber, isPrimary,\n      \tcomment, geo { latitude, longitude }, formattedStringValue\n      }\n    }, \n    image {\n      id\n    }\n    birthday, \n    isBanxeUser, \n    common {\n      isDeleted, \n      timestamps {\n        createdAt, \n        updatedAt\n      }\n    }\n  }\n}","apiUrl":"","variables":"{}","subscriptionUrl":"","headers":[{"key":"","value":"","enabled":true}],"windowName":"query-contacts","preRequestScript":"","preRequestScriptEnabled":false,"id":"eacc9155-7d8f-4d0c-8d21-50ed80b9a813","updated_at":1599129175162},{"version":1,"type":"window","query":"mutation {\n  removeMyContacts(input: {\n    contactIds: [\"5f4c82051c57e53b7b46d4bb\"]\n  }) {\n    id, name {\n      firstName, middleName, lastName, legalName\n    }, common {\n      isDeleted,timestamps {\n        createdAt, updatedAt\n      }\n    }\n  }\n}","apiUrl":"","variables":"{}","subscriptionUrl":"","headers":[{"key":"","value":"","enabled":true}],"windowName":"remove-contact","preRequestScript":"","preRequestScriptEnabled":false,"id":"b2bfed33-2352-482a-8742-22e26d4a6690","created_at":1598860682736,"updated_at":1598860682736},{"version":1,"type":"window","query":"mutation {\n  addMyContacts(input: {\n    contactInfo: [\n      {\n        name: {\n          firstName: \"\", \n          lastName: \"\", \n          legalName: \"\",\n          middleName: \"\"\n        },\n        nickName: \"darth vader\", \n        emails: [\n          {email: \"darth.vader@live.com\", type: \"starwars\"},\n          {email: \"luke.skywalker@jedi-academy.com\", type: \"jedi-academy\"},\n          {email: \"redouane@jedi-academy.com\", type: \"jedi-academy\"},\n          \n        ],\n        phones: [\n          {type: \"home\", phone: \"+79131187092\"},\n          {type: \"mobile\", phone: \"+7111222333444\"}\n        ],\n        organization: {\n          jobTitle: \"sith lord\", \n          departmentName: \"evil\", \n          organizationName: \"sith\"\n        },\n        socials: [{id:\"luke\", type: \"twitter\"}],\n        addresses: [\n          {\ttype: \"home\", \n            address: {\n              postalCode: \"1001\",\n              city: \"5f48b376ce789cdcf3952174\",\n              street: \"aa-52\",\n              subStreet: \"valor\",\n              buildingName: \"Jedi Tample\",\n              buildingNumber: \"c3po\",\n              flatNumber: \"r2d2\",\n              isPrimary: true,\n              comment: \"le retour de jedi\",\n              geo: {\n                latitude: \"123.456\",\n                longitude: \"654.321\"\n              },\n              formattedStringValue: \"inter-galactic outer rim, 255-ff\"\n        \t}\n          }],\n        birthday: 13456789012,\n        imageFileId: \"5f48b376ce789cdcf3952175\",\n      },\n      {\n        name: {\n          firstName: \"redouane\", \n          lastName: \"sobaihi\", \n          legalName: \"redhouane\",\n          middleName: \"none\"\n        },\n        nickName: \"red\",\n        emails: [\n          {email: \"red@starwars.com\", type: \"starwars\"},\n          # {email: \"redouane@jedi-academy.com\", type: \"jedi-academy\"}\n        ],\n        phones: [\n          {type: \"mobile\", phone: \"+79131187090\"},\n          {type: \"home\", phone: \"+744444111222\"}\n        ],\n        urls: [\n          {url: \"https://github.com/aaa\", type: \"Github\"}\n        ]\n        organization: {\n          jobTitle: \"sith lord\", \n          departmentName: \"evil\", \n          organizationName: \"sith\"\n        },\n        socials: [{id:\"redouane\", type: \"twitter\"}],\n        addresses: [\n          {\ttype: \"home\", \n            address: {\n              postalCode: \"1100\",\n              city: \"5f48b376ce789cdcf3952174\",\n              street: \"aa-52\",\n              subStreet: \"valor\",\n              buildingName: \"Jedi Tample\",\n              buildingNumber: \"c3po\",\n              flatNumber: \"r2d2\",\n              isPrimary: true,\n              comment: \"le retour de jedi\",\n              geo: {\n                latitude: \"123.456\",\n                longitude: \"654.321\"\n              },\n              formattedStringValue: \"inter-galactic outer rim, 255-ff\"\n        \t}\n          }],\n        birthday: 13456789012,\n        imageFileId: \"5f48b376ce789cdcf3952175\",\n      }\n    ]\n  }) {\n    id, \n    name {\n      firstName, middleName, lastName, legalName\n    }, \n    nickName, \n    organization {\n    \tjobTitle, departmentName, organizationName\n    },\n    socials {\n      id, type\n    }, \n    emails {\n      email, type\n    }, \n    phones {\n    \tphone, type\n    }, \n    addresses { type, address {\n      postalCode, city { id }, street, subStreet, buildingName, \n      flatNumber, buildingNumber, isPrimary,\n      comment, geo { latitude, longitude }, formattedStringValue\n    }}, \n    birthday, \n    isBanxeUser, \n    common {\n      isDeleted,\n      timestamps {\n        createdAt, updatedAt\n      }\n    }, \n    image {\n      id\n    }\n  }\n}","apiUrl":"","variables":"{}","subscriptionUrl":"","headers":[{"key":"gateway-is-authorized","value":"true","enabled":true},{"key":"gateway-user-id","value":"123456789abcdef","enabled":true},{"key":"gateway-role","value":"USER","enabled":true}],"windowName":"create-contact","preRequestScript":"","preRequestScriptEnabled":false,"id":"1d072ff0-0fab-429f-bb59-8d0b4491fd62","created_at":1599129068347,"updated_at":1599129068347}],"created_at":1598860660213,"updated_at":1599129175162,"id":1}