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
                                           encoding:NSUTF8StringEncoding];
    
    RCTLogInfo(@"Scrapped books");
    
    resolve(data);
  });
}

RCT_REMAP_METHOD(fetchBook,
                 page:(nonnull NSString *)page
                 fetchBookWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    RCTLogInfo(@"Scrapping boos with page %@", page);
  
    NSString *data = [[NSString alloc] initWithData:GoScrapperFetchBook(page)
                                           encoding:NSUTF8StringEncoding];
    
    RCTLogInfo(@"Scrapped book");
    
    resolve(data);
  });
}

RCT_REMAP_METHOD(downloadBook,
                  url:(nonnull NSString *)url
                  fileName:(nonnull NSString *)fileName
                 downloadBookWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    RCTLogInfo(@"Downloading book %@ %@", fileName, url);

    NSString *extension = nil;
    
    NSString *documentDir = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];

    if ([url containsString:@"pdf"]) {
      extension = @".pdf";
    } else {
      extension = @".epub";
    }
    
    NSString *pathWithExtension = [NSString stringWithFormat:@"%@%@",fileName,extension];
    
    NSString *filePath = [documentDir stringByAppendingPathComponent:pathWithExtension];
    
    RCTLogInfo(@"File path completed %@",filePath);
    
    @try {
      GoScrapperDownloadBook(url, filePath, nil);
      resolve(@true);
    } @catch (NSException *exception) {
      reject(nil,nil,exception);
    }
    
    RCTLogInfo(@"Downloaded book");
  });
}

@end
