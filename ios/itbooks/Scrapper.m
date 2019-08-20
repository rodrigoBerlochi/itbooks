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

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(fetchQueueBooks,
                   fetchQueueBooksWithResolver:(RCTPromiseResolveBlock)resolve
                   rejecter:(RCTPromiseRejectBlock)reject)
{
  RCTLogInfo(@"Scrapping books");
  NSString *data = [[NSString alloc] initWithData:GoScrapperFetchQueueBooks()
                                           encoding:NSASCIIStringEncoding];
  RCTLogInfo(@"Scrapped books");
  resolve(data);
}

@end
