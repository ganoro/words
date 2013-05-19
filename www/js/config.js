define(function() {
	// Tell Require.js that this module returns a reference to jQuery
	var config = {
    
		edition : 'full',
        gender : 'female',
        user_name : '',
        progress : 0,
		
        storeConfig : function() {
            localStorage.setItem('alefbet.gender', this.gender);
            localStorage.setItem('alefbet.user_name', this.user_name);
            localStorage.setItem('alefbet.progress', this.progress);

        },
        
        loadConfig : function() {
            this.gender = localStorage.getItem('alefbet.gender');
            if (this.gender == null) {
                this.gender = "female"
            }
            this.user_name = localStorage.getItem('alefbet.user_name');
            if (this.user_name == null) {
                this.user_name = "";
            }
            this.progress = localStorage.getItem('alefbet.progress');
            if (this.progress == null) {
                this.progress = "";
            }
        },
       
		isFree : function() {
			return this.edition == "free";
		},
        
        isFemale : function() {
            return this.gender == 'female';
        },
        
        setFemale : function() {
            this.gender = "female";
            this.storeConfig();
        },
        
        setMale : function() {
            this.gender = "male";
            this.storeConfig();
        },
        
        setUserName : function(name) {
            this.user_name = name;                      
            this.storeConfig();
        },
        
        getUserName : function() {
            return this.user_name;
        },
        
        getGroup : function() {
            var group = localStorage.getItem('alefbet.group');
            if (group == null || typeof(group) === "undefined") {
                group = Math.floor(3 * Math.random());
                localStorage.setItem('alefbet.group', group);
            }
            return group;
        },
        
        getFirstLogin : function() {
            var first_login = localStorage.getItem('alefbet.first_login');
            if (first_login == null || typeof(first_login) === "undefined") {
                first_login = (new Date()).toString();
                localStorage.setItem('alefbet.first_login', first_login);
            }
            return first_login;
        },
       
        increment : function() {
            this.progress++;
            this.storeConfig();
        },
       
        getProgress : function() {
           return this.progress;
        }
	};
	return config;
});