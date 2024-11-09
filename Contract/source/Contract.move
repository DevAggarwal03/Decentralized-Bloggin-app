// module decentralized_reddit::reddit {
//     use std::string::String;
//     use std::signer;
//     use aptos_framework::event;
//     use aptos_framework::account;
//     use aptos_framework::timestamp;
//     use std::vector;
//     use aptos_framework::table::{Self, Table};

//     // Struct to store post information
//     struct Post has store, drop {
//         author: address,
//         title: String,
//         description: String,
//         timestamp: u64,
//     }

//     // Resource struct to store all posts and related data
//     struct RedditStore has key {
//         posts: Table<u64, Post>,
//         post_count: u64,
//         post_created_events: event::EventHandle<PostCreatedEvent>,
//     }

//     // Event emitted when a new post is created
//     struct PostCreatedEvent has drop, store {
//         post_id: u64,
//         author: address,
//         title: String,
//         description: String,
//         timestamp: u64,
//     }

//     // Error codes
//     const ENO_STORE: u64 = 0;
//     const EPOST_NOT_FOUND: u64 = 1;

//     // Initialize the RedditStore
//     entry fun init_module(account: &signer) {
//         let store = RedditStore {
//             posts: table::new(),
//             post_count: 0,
//             post_created_events: account::new_event_handle<PostCreatedEvent>(account),
//         };
//         move_to(account, store);
//     }

//     // Create a new post
//     public entry fun create_post(
//         account: &signer,
//         title: String,
//         description: String,
//     ) acquires RedditStore {
//         let signer_address = signer::address_of(account);
        
//         // Get the store
//         let store = borrow_global_mut<RedditStore>(signer::address_of(account));
        
//         // Create new post
//         let post = Post {
//             author: signer_address,
//             title,
//             description,
//             timestamp: timestamp::now_seconds(),
//         };

//         // Add post to table
//         let post_id = store.post_count;
//         table::add(&mut store.posts, post_id, post);
        
//         // Increment post count
//         store.post_count = post_id + 1;

//         // Emit event
//         event::emit_event(
//             &mut store.post_created_events,
//             PostCreatedEvent {
//                 post_id,
//                 author: signer_address,
//                 title,
//                 description,
//                 timestamp: timestamp::now_seconds(),
//             },
//         );
//     }

//     #[view]
//     // Get a single post by ID
//     public fun get_post(account: address, post_id: u64): (address, String, String, u64) acquires RedditStore {
//         let store = borrow_global<RedditStore>(account);
//         assert!(table::contains(&store.posts, post_id), EPOST_NOT_FOUND);
        
//         let post = table::borrow(&store.posts, post_id);
//         (post.author, post.title, post.description, post.timestamp)
//     }

//     #[view]
//     // Get all posts (returns vectors of post components)
//     public fun get_all_posts(account: address): (vector<address>, vector<String>, vector<String>, vector<u64>) acquires RedditStore {
//         let store = borrow_global<RedditStore>(account);
        
//         let authors = vector::empty<address>();
//         let titles = vector::empty<String>();
//         let descriptions = vector::empty<String>();
//         let timestamps = vector::empty<u64>();
        
//         let i = 0;
//         while (i < store.post_count) {
//             if (table::contains(&store.posts, i)) {
//                 let post = table::borrow(&store.posts, i);
//                 vector::push_back(&mut authors, post.author);
//                 vector::push_back(&mut titles, post.title);
//                 vector::push_back(&mut descriptions, post.description);
//                 vector::push_back(&mut timestamps, post.timestamp);
//             };
//             i = i + 1;
//         };
        
//         (authors, titles, descriptions, timestamps)
//     }

//     // Get the total number of posts
//     #[view]
//     public fun get_post_count(account: address): u64 acquires RedditStore {
//         let store = borrow_global<RedditStore>(account);
//         store.post_count
//     }
// }