//
//  Scrapper.m
//  itbooks
//
//  Created by xose on 20/08/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <React/RCTLog.h>
#import "Scrapper.h"
#import "GoScrapper/GoScrapper.h"

@implementation Scrapper

- (dispatch_queue_t) methodQueue {
  return dispatch_queue_create("Scrapper.queue", DISPATCH_QUEUE_SERIAL);
}

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(fetchQueueBooks,
                   page:(nonnull NSNumber *)page
                   fetchQueueBooksWithResolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    RCTLogInfo(@"Scrapping books with page number %@", page);

    NSString *data = [[NSString alloc] initWithData:GoScrapperFetchQueueBooks([page longValue])
                                           encoding:NSASCIIStringEncoding];
    
    RCTLogInfo(@"Scrapped books");
    
    resolve(data);
  });
}

@end
