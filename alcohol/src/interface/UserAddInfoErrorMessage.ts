export interface UserAddInfoErrorMessage {
    nickname: string;
    age: string;
    birth: string;
    sex: string;
    job: string;
    MaximumPrice: string;
    favoriteList: string;

    nicknameValidation : boolean,
    ageValidation : boolean,
    birthValidation : boolean,
    sexValidation : boolean,
    jobValidation : boolean,
    MaximumPriceValidation : boolean,
    favoriteListValidation : boolean
    duplicationCheck : boolean
  }
